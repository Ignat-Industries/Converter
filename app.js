/* eslint-disable no-unused-vars */
/* global Vue, math, XLSX, Tabulator, jspdf */
import { i18n, loadMessages, supportedLangs } from './i18n.js';
import unitsData from './unitsData.js';

/* ==================================================================== */
/*  C O N S T A N T S                                                   */
/* ==================================================================== */
const USE_INLINE_TEMP_SELECTOR = false;           // true → селектор в заголовке
const TEMP_UNIT_OPTIONS        = ['°C', 'K', '°F'];
const TEMP_COLS                = ['Boiling Temperature', 'Critical temperature'];
const TOOLTIP_COLS             = [
  'Mass Density',
  'Viscosity',
  'Kinematic Viscosity',
  'Cp/Cv',
];
const MAX_HISTORY     = 10;
const SPECIAL_SYMBOLS = ['Ω','µ','°','π','×','⁻¹'];

const BASE         = document.querySelector('base')?.href
                   || window.location.pathname.replace(/\/[^/]*$/, '');
const LIBRARY_PATH = `${BASE}/data/raw/library.xlsx`;

/* =================================================================== */
/* 1. общий паттерн для захвата символа/алиаса в конце строки          */
/*    латиница, кириллица, градус, микро, + точка, пробел, кругл. скоб */
/* =================================================================== */
const REGEX_TOKEN = /([a-zA-Zа-яА-Яµ°.\s()]+)$/;

/* ==================================================================== */
/*  U T I L S                                                           */
/* ==================================================================== */
const bigFormat = n => {
  const a = Math.abs(n);
  if (a>=1e6 || (a && a<=1e-6)) return n.toExponential(6).replace(/e\+/,'e');
  return (Math.round(n*1e12)/1e12).toString();
};

/* температурные формулы */
const tempConv = {
  '°C': v => ({ 'K': v + 273.15, '°C': v, '°F': v * 9/5 + 32,
                '°R': (v + 273.15) * 9/5,
                '°Ré': v * 0.8,
                '°N': v * 33/100,
                '°De': (100 - v) * 3/2,
                '°Rø': (v * 21/40) + 7.5
  }),

  'K' : v => ({ 'K': v, '°C': v - 273.15, '°F': v * 9/5 - 459.67,
                '°R': v * 9/5,
                '°Ré': (v - 273.15) * 0.8,
                '°N':  (v - 273.15) * 33/100,
                '°De': (373.15 - v) * 3/2,
                '°Rø': (v - 273.15) * 21/40 + 7.5
  }),

  '°F': v => tempConv['°C']((v - 32) * 5/9),
  '°R': v => tempConv['K'](v * 5/9),
  '°Ré': v => tempConv['°C'](v * 1.25),
  '°N': v => tempConv['°C'](v * 100/33),
  '°De': v => tempConv['°C'](100 - v * 2/3),
  '°Rø': v => tempConv['°C']((v - 7.5) * 40/21)
};

/* ==================================================================== */
/*  M A I N   A P P                                                     */
/* ==================================================================== */
loadMessages().then(() => {
  const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

  /* helper: все символы и алиасы юнита в нижнем регистре */
  const allKeys = (u, lower = false) => {
    const arr = [
      ...(u.aliases || []),
      ...Object.values(u.symbol || {})
    ];
    return lower ? arr.map(s => s.toLowerCase()) : arr;
  };

  /* helper: найти юнит по символу (учитывая все языки) */
  const findUnitBySym = (arr, symb) => arr.find(u =>
    Object.values(u.symbol||{}).includes(symb));

  const app = createApp({
    /* ================================================================ */
    /*  T E M P L A T E                                                 */
    /* ================================================================ */
    /* html */ template: `
      <div class="lang-select">
        <template v-if="!USE_INLINE_TEMP_SELECTOR && currentModule==='library'">
          <select v-model="tempUnit" style="margin-right:8px">
            <option v-for="u in TEMP_UNIT_OPTIONS" :value="u">{{ u }}</option>
          </select>
        </template>

        <select v-model="language">
          <option v-for="l in languages" :value="l.code">{{ l.name }}</option>
        </select>
      </div>

      <h1>{{ $t('title') }}</h1>

      <div class="nav">
        <button v-for="m in modules"
                :class="{active:currentModule===m}"
                @click="currentModule=m">
          {{ $t(m) }}
        </button>
      </div>

      <!-- ================= К О Н В Е Р Т Е Р ================= -->
      <template v-if="currentModule==='converter'">
        <div class="input-row">
          <input v-model="inputText"
                 :placeholder="$t('example')"
                 :list="inputText.trim()==='' ? 'historyList' : 'dyn-suggestions'"
                 @input="parseInput"
                 @focus="onLeftFocus"/>
          <button class="swap-btn" @click="swapUnits"><i class="fas fa-right-left"></i></button>
          <input v-model="targetUnit"
                 list="target-suggestions"
                 :placeholder="$t('toUnit')"
                 @focus="showFullTargetList"
                 @input="onTargetTyped"/>
          <datalist id="target-suggestions">
            <option v-for="u in targetOptions" :value="u">
              {{ displayNameBySym(u) }} ({{ u }})
            </option>
          </datalist>
        </div>

        <div class="symbols">
          <span>{{ $t('symbol_help') }}:</span>
          <button v-for="s in special" class="sym-btn" @click="appendSym(s)">{{ s }}</button>
        </div>

        <div class="result" v-if="convertedValue!==null">
          {{ $t('result') }}: {{ formattedConverted }} {{ targetUnit }}
        </div>

        <div class="table-actions" v-if="parsedType">
          <button class="btn" @click="exportExcel">{{ $t('export_excel') }}</button>
          <button class="btn" @click="exportPDF">{{ $t('export_pdf') }}</button>
        </div>

        <datalist id="historyList">
          <option v-for="h in history" :value="h"></option>
        </datalist>

        <datalist id="dyn-suggestions">
          <option v-for="opt in dynSuggestions" :value="opt.full">
            {{ opt.name }} ({{ opt.short }})
          </option>
        </datalist>
      </template>

      <!-- ================= Б И Б Л И О Т Е К А ================= -->
      <template v-else-if="currentModule==='library'">
        <div class="table-wrap">
          <div id="libTable" class="table-holder" ref="tableHolder"></div>
        </div>

        <div class="table-actions">
          <button class="btn" @click="downloadTable('xlsx')">{{ $t('export_excel') }}</button>
          <button class="btn" @click="downloadTable('pdf')">{{ $t('export_pdf') }}</button>
          <button class="btn" @click="downloadTable('csv')">CSV</button>
        </div>
      </template>

      <!-- ================= К А Л Ь К У Л Я Т О Р ================ -->
      <template v-else>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                    min-height:5vh;text-align:center;color:white;">
          <h2 style="margin-top:1rem;font-size:1rem;">Work in progress</h2>
        </div>
      </template>
    `,

    /* ================================================================ */
    /*  S C R I P T                                                     */
    /* ================================================================ */
    setup() {
      const XLSXUtils = XLSX.utils;

      /* ---------------------- STATE -------------------------------- */
      const currentModule = ref('converter');
      const modules       = ['converter','library','calculator'];

      const language  = ref('en');
      const languages = supportedLangs.map(code => ({
        code,
        name:{
          en:'English',ru:'Русский',es:'Español',de:'Deutsch',fr:'Français',
          zh:'中文',pt:'Português',ar:'العربية',hi:'हिन्दी',ja:'日本語'
        }[code]||code
      }));

      /* ----------- конвертер ---------------- */
      const inputText   = ref('');
      const targetUnit  = ref('');
      const parsedValue = ref(null);
      const parsedType  = ref('');
      const parsedUnit  = ref('');
      const history     = ref(JSON.parse(localStorage.getItem('convHist')||'[]'));

      /* ----------- библиотека --------------- */
      const tableHolder = ref(null);
      const tempUnit    = ref('°C');
      const engHeader   = ref([]);
      let   rawRowsC    = [];
      /** @type {Tabulator|null} */ let tableInst = null;

      /* -------------------- COMPUTED ------------------------------ */
      const unitsFlat = computed(()=>Object.values(unitsData).flat());

      const targetOptions = computed(()=>parsedType.value
        ? unitsData[parsedType.value].map(u=>u.symbol[language.value]||u.symbol.en)
        : []);

      const convertedValue = computed(()=>{
        if(!parsedType.value||!targetUnit.value||parsedValue.value==null) return null;
        return convert(parsedValue.value, parsedUnit.value, targetUnit.value);
      });

      const formattedConverted = computed(()=>convertedValue.value!=null
        ? bigFormat(convertedValue.value)
        : '');

      const dynSuggestions = computed(() => {
        const m = inputText.value.match(new RegExp(`^(.*?)${REGEX_TOKEN.source}`));
        if (!m) return [];

        const prefix = m[1];
        const token  = (m[2] || '').toLowerCase().trim();   // «ч.», «ч. л», …

        if (!token) return [];

        return unitsFlat.value
          // сравниваем в нижнем регистре, чтобы «Ч.» тоже нашлось
          .filter(u => allKeys(u, true).some(k => k.startsWith(token)))
          .map(u => ({
            full : `${prefix}${u.symbol[language.value] || u.symbol.en}`,
            name : u.names[language.value]  || u.names.en,
            short: u.symbol[language.value] || u.symbol.en
          }))
          .slice(0, 100);
      });

      /* -------------------- HELPERS ------------------------------- */
      const name = u=>u.names[language.value]||u.names.en;
      const sym  = u=>u.symbol[language.value]||u.symbol.en;

      const displayNameBySym = s=>{
        const u=unitsFlat.value.find(x=>Object.values(x.symbol||{}).includes(s));
        return u?name(u):s;
      };

      const appendSym = s=>{inputText.value+=s;};

      function parseInput () {
        const m = inputText.value.trim()
                    .match(new RegExp(`^(.+?)\\s*${REGEX_TOKEN.source}`));
        if (!m) { parsedType.value = ''; return; }

        /* ---------- число ------------------------------------------------- */
        let val;
        try { val = math.evaluate(m[1]); }
        catch { parsedType.value = ''; return; }

        /* ---------- символ / алиас --------------------------------------- */
        const tokenRaw   = m[2].trim();           // «ч. лож.» / «gal (US)» / …
        const tokenLower = tokenRaw.toLowerCase();

        /* ---------- поиск ------------------------------------------------- */
        const flat = unitsFlat.value;

        // 1) точное совпадение (учитываем регистр, точки, пробелы)
        let found = flat.find(u => allKeys(u).includes(tokenRaw));

        // 2) fallback: нечувствительный к регистру поиск
        if (!found)
          found = flat.find(u => allKeys(u, true).includes(tokenLower));

        if (!found) { parsedType.value = ''; return; }

        /* ---------- сохранить результат ---------------------------------- */
        parsedValue.value = val;
        parsedUnit.value  = found.symbol.en;
        parsedType.value  = Object.keys(unitsData)
                           .find(k => unitsData[k].includes(found));

        /* ---------- подстроить правую единицу, если нужно ---------------- */
        const allowed = unitsData[parsedType.value]
                          .map(u => u.symbol[language.value] || u.symbol.en);

        if (!allowed.includes(targetUnit.value))
          targetUnit.value = parsedType.value === 'temperature' ? 'K' : allowed[0];
      }

      function convert(v, fromSym, toSym){
        if(parsedType.value==='temperature'){
          const base=Object.keys(tempConv).find(k=>allKeys({symbol:{en:k}}).includes(fromSym));
          const conv=tempConv[base];
          if(!conv) return null;
          return conv(fromSym===base?v:tempConv[fromSym]?.(v)?.[base])[toSym];
        }
        const arr=unitsData[parsedType.value];
        const f=findUnitBySym(arr, fromSym);
        const t=findUnitBySym(arr, toSym);
        return f&&t? v*(f.factor/t.factor) : null;
      }

      const swapUnits = () => {
        // используем тот же REGEX_TOKEN, что и в parseInput
        const m = inputText.value.trim()
                  .match(new RegExp(`^(.+?)\\s*${REGEX_TOKEN.source}`));
        if (!m) return;

        const num  = m[1];           // числовая часть
        const from = m[2].trim();    // символ слева целиком, включая точки/скобки

        /* 1. меняем символы местами прямо в строке ввода */
        inputText.value = `${num} ${targetUnit.value}`;

        /* 2. в правое поле переносим прежний левый символ */
        targetUnit.value = from;

        /* 3. пересчитываем результат */
        parseInput();
      };

      const showFullTargetList = ()=>{
        const v=targetUnit.value; targetUnit.value='';
        requestAnimationFrame(()=>{targetUnit.value=v;});
      };

      const onTargetTyped = () => {
        const token = targetUnit.value;        // что сейчас набрано справа

        // 1) Если введённый символ уже допустим для текущего типа – ничего не делаем
        if (targetOptions.value.includes(token)) return;

        // 2) Пытаемся найти ИДЕНТИЧНОЕ (с учётом регистра) совпадение в списке
        const exactMatch = targetOptions.value.find(u => u === token);
        if (exactMatch) {
          targetUnit.value = exactMatch;       // пользователь, видимо, опечатался
          return;
        }

        // 3) (необязательно) – безопасная "попытка помочь", если
        // точного совпадения нет, но разница лишь в регистре и
        // *единственное* совпадение case-insensitive:
        const fuzzyMatches = targetOptions.value
          .filter(u => u.toLowerCase() === token.toLowerCase());

        if (fuzzyMatches.length === 1) {
          // Примем его, только если нет коллизий, как с "см"/"См"
          targetUnit.value = fuzzyMatches[0];
        }
      };

      const onLeftFocus = ()=>{/* history datalist auto */};

      /* -------------------- EXPORTS ------------------------------- */
      function exportExcel(){
        const rows=[['Unit','Symbol','Value']];
        unitsData[parsedType.value].forEach(u=>{
          const symbol=sym(u);
          rows.push([name(u), symbol, convert(parsedValue.value, parsedUnit.value, symbol)]);
        });
        const ws=XLSXUtils.aoa_to_sheet(rows);
        rows.forEach((r,i)=>{
          if(i===0) return;
          const cell=ws[XLSX.utils.encode_cell({c:2,r:i})];
          if(cell) cell.t='n';                      // принудительно number
        });
        const wb=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Data');
        XLSX.writeFile(wb,'conversion.xlsx');
      }

      function exportPDF(){
        const { jsPDF }=window.jspdf;
        const doc=new jsPDF({orientation:'landscape'});
        doc.setFont('helvetica').setFontSize(12);
        doc.text(`Result: ${formattedConverted.value} ${targetUnit.value}`,14,14);
        doc.autoTable({
          head:[['Unit','Symbol','Value']],
          body:unitsData[parsedType.value].map(u=>[
            u.names.en,
            u.symbol.en,
            bigFormat(convert(parsedValue.value, parsedUnit.value, u.symbol.en))
          ]),
          startY:22,styles:{font:'helvetica',fontSize:10}
        });
        doc.save('conversion.pdf');
      }

      /* -------------------- LIBRARY ------------------------------- */
      async function ensureLibraryLoaded(){
        if(rawRowsC.length) return;
        const res=await fetch(LIBRARY_PATH);
        if(!res.ok){alert('library.xlsx not found');return;}
        const buf=await res.arrayBuffer();
        const wb =XLSX.read(buf,{type:'array'});
        const ws =wb.Sheets[wb.SheetNames[0]];
        const rows=XLSXUtils.sheet_to_json(ws,{header:1,defval:''});
        engHeader.value=rows[0].map(h=>h.replace(/\s*\(.*$/,'').trim());
        rawRowsC=rows.slice(1);
      }

      const makeLibData = unit=>rawRowsC.map(r=>{
        const row={};
        engHeader.value.forEach((base,i)=>{
          if(TEMP_COLS.includes(base)){
            const v=parseFloat(r[i]);
            row[base]=Number.isFinite(v)
              ? bigFormat(unit==='°C'?v:tempConv['°C'](v)[unit])
              : r[i];
          }else row[base]=r[i];
        });
        return row;
      });

      const makeLibColumns = unit=>engHeader.value.map(base=>{
        const title=(language.value!=='en'
            ? i18n.global.t(`col_${base}`,base)
            : base )
          +(TEMP_COLS.includes(base)?` (${unit})`:'');

        const colObj = {
          title,
          field: base,
          sorter: 'number',
          headerFilter: 'input',
        };

        /* Добавляем всплывающую подсказку для нужных колонок */
        if (TOOLTIP_COLS.includes(base)){
          colObj.headerTooltip = i18n.global.t(
            'tooltip_0C',
            'at 0°C or 273,15 K or 32°F'
          );
        }
        return colObj;
      });

      function renderLibrary(){
        const data=makeLibData(tempUnit.value);
        const columns=makeLibColumns(tempUnit.value);
        tableInst?.destroy();
        tableInst=new Tabulator(tableHolder.value,{
          data, columns,
          layout:'fitDataStretch',
          pagination:'local',paginationSize:25,
          locale:language.value
        });
      }

      async function loadLib(){
        await ensureLibraryLoaded(); await nextTick(); renderLibrary();
      }

      /* -------------------- LIBRARY EXPORT ------------------------------ */
      function downloadTable(fmt){
        if (!tableInst) return;

        // Заголовки на английском (добавляем текущую шкалу к температурным колонкам)
        const engHdr = engHeader.value.map(h =>
          TEMP_COLS.includes(h) ? `${h} (${tempUnit.value})` : h
        );

        // ---------------- PDF (английский) ----------------
        if (fmt === 'pdf'){
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({ orientation: 'landscape' });

          doc.setFont('helvetica').setFontSize(10);
          doc.autoTable({
            head : [engHdr],
            body : tableInst.getData().map(r => engHeader.value.map(h => r[h])),
            startY: 14,
          });

          doc.save('library.pdf');
          return;
        }

        // ---------------- CSV (английский) ----------------
        if (fmt === 'csv'){
          const rows = [
            engHdr,
            ...tableInst.getData().map(r => engHeader.value.map(h => r[h])),
          ];

          // Простая экранизация для CSV
          const csv = rows
            .map(row => row
              .map(cell => `"${String(cell).replace(/"/g, '""')}"`)
              .join(',')
            )
            .join('\r\n');

          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'library.csv';
          link.click();
          URL.revokeObjectURL(link.href);
          return;
        }

        // ---------------- XLSX – оставляем выбранный язык ----------------
        tableInst.download(fmt, `library.${fmt}`);
      }

      /* -------------------- WATCHERS ------------------------------ */
      watch(language,l=>{
        i18n.global.locale.value=l;
        tableInst?.setLocale(l);
        if(currentModule.value==='library') renderLibrary();
      });

      watch(tempUnit,()=>{ if(currentModule.value==='library') renderLibrary(); });

      watch(convertedValue,val=>{
        if(val==null) return;
        history.value.unshift(inputText.value.trim());
        history.value=history.value.slice(0,MAX_HISTORY);
        localStorage.setItem('convHist',JSON.stringify(history.value));
      });

      onMounted(async()=>{ if(currentModule.value==='library') await loadLib(); });

      watch(currentModule,async m=>{
        if(m==='library') await loadLib();
        else { tableInst?.destroy(); tableInst=null; }
      });

      /* -------------------- EXPOSE -------------------------------- */
      return {
        /* consts */ USE_INLINE_TEMP_SELECTOR,TEMP_UNIT_OPTIONS,
        /* shared */ currentModule,modules,language,languages,
        /* converter */ inputText,targetUnit,parsedType,
        convertedValue,formattedConverted,history,
        dynSuggestions,targetOptions,special:SPECIAL_SYMBOLS,
        /* library */ tableHolder,tempUnit,
        /* methods conv */ parseInput,swapUnits,appendSym,
        showFullTargetList,onTargetTyped,onLeftFocus,
        exportExcel,exportPDF,
        /* methods lib */ downloadTable,
        /* helpers */ name,sym,displayNameBySym
      };
    }
  });

  app.use(i18n).mount('#app');
});
