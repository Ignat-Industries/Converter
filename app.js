/* eslint-disable no-unused-vars */
/* global Vue, math, XLSX, Tabulator, jspdf */
import { i18n, loadMessages, supportedLangs } from './i18n.js';
import unitsData from './unitsData.js';

/* =======================================================================
 *  У Т И Л И Т Ы
 * ===================================================================== */
const MAX_HISTORY     = 10;
const SPECIAL_SYMBOLS = ['Ω', 'µ', '°', 'π', '×', '⁻¹'];
const LIBRARY_PATH    = './data/raw/library.xlsx';

/** Форматирует число для вывода */
function bigFormat(n) {
  const a = Math.abs(n);
  if (a >= 1e6 || (a && a <= 1e-6)) {
    return n.toExponential(6).replace(/e\+/, 'e');
  }
  return (Math.round(n * 1e12) / 1e12).toString();
}

/* noinspection JSNonASCIINames */ /* температурные формулы */
const tempConv = /** @type {{[k:string]:(v:number)=>Record<string,number>}} */ ({
  '°C': v => ({ '°C': v,                 '°F': v * 9 / 5 + 32,      'K': v + 273.15 }),
  '°F': v => ({ '°C': (v - 32) * 5 / 9,  '°F': v,                   'K': (v - 32) * 5 / 9 + 273.15 }),
  'K' : v => ({ '°C': v - 273.15,        '°F': (v - 273.15) * 9 / 5 + 32, 'K': v })
});

/* =======================================================================
 *  П Р И Л О Ж Е Н И Е
 * ===================================================================== */
loadMessages().then(() => {
  const { createApp, ref, computed, watch, onMounted } = Vue;

  const app = createApp({
    /* html */ template: `
      <div class="lang-select">
        <select v-model="language">
          <option v-for="l in languages" :value="l.code">{{ l.name }}</option>
        </select>
      </div>

      <h1>{{ $t('title') }}</h1>

      <!-- навигация -->
      <div class="nav">
        <button v-for="m in modules"
                :class="{active: currentModule===m}"
                @click="currentModule=m">
          {{ $t(m) }}
        </button>
      </div>

      <!-- ================= К О Н В Е Р Т Е Р ================= -->
      <template v-if="currentModule==='converter'">
        <div class="input-row">
          <input
            v-model="inputText"
            :placeholder="$t('example')"
            :list="inputText.trim() === '' ? 'historyList' : 'dyn-suggestions'"
            @input="parseInput"
            @focus="onLeftFocus"
          />

          <button class="swap-btn" @click="swapUnits">
            <i class="fas fa-right-left"></i>
          </button>

          <input v-model="targetUnit"
                 list="target-suggestions"
                 :placeholder="$t('toUnit')"
                 @focus="showFullTargetList"
                 @input="onTargetTyped" />
          
          
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
          <option v-for="opt in dynSuggestions"
                  :key="opt.full"
                  :value="opt.full">
            {{ opt.name }} ({{ opt.short }})
          </option>
        </datalist>
        
        <datalist id="unit-suggestions">
           <template v-for="unit in unitsFlat">
              <!-- главный символ -->
              <option :value="sym(unit).toLowerCase()">
                {{ name(unit) }} ({{ sym(unit) }})
              </option>
              <!-- все алиасы, если есть -->
              <option v-for="al in unit.aliases || []"
                      :key="al"
                      :value="al.toLowerCase()">
                {{ name(unit) }} ({{ al }})
              </option>
           </template>
        </datalist>

        
        <p class="note">{{ $t('case_note') }}</p>
      </template>

      <!-- ================= Б И Б Л И О Т Е К А ================ -->
      <template v-else-if="currentModule==='library'">
        <div class="table-holder" ref="tableHolder"></div>
        <div class="table-actions">
          <button class="btn" @click="downloadTable('xlsx')">{{ $t('export_excel') }}</button>
          <button class="btn" @click="downloadTable('pdf')">{{ $t('export_pdf') }}</button>
          <button class="btn" @click="downloadTable('csv')">CSV</button>
        </div>
      </template>

      <!-- ================= К А Л Ь К У Л Я Т О Р ============== -->
      <template v-else>
        <div class="stub">
          <i class="fas fa-tools fa-2x"></i><br>
          {{ $t('calc_stub') }}
        </div>
      </template>
    `,

    /* ----------------- Л О Г И К А -------------------------- */
    setup() {
      /* ----------- глобальные объекты XLSX ------------------ */
      /** @type {import('xlsx').utils} */
      const XLSXUtils = XLSX.utils;

      const currentModule = ref('converter');
      const modules       = ['converter', 'library', 'calculator'];

      const language = ref('en');
      const languages = supportedLangs.map(code => ({
        code,
        name: {
          en:'English', ru:'Русский', es:'Español', de:'Deutsch', fr:'Français',
          zh:'中文',     pt:'Português', ar:'العربية', hi:'हिन्दी', ja:'日本語'
        }[code] || code
      }));

      /* ----------- конвертер ---------------- */
      const inputText    = ref('');
      const targetUnit   = ref('');
      const parsedValue  = ref(null);
      const parsedType   = ref('');
      const parsedUnit   = ref('');
      const history      = ref(JSON.parse(localStorage.getItem('convHist') || '[]'));

      /* ----------- библиотека --------------- */
      const tableHolder = ref(null);
      /** @type {Tabulator | null} */ let tableInst = null;

      /* === вычисления === */
      const targetOptions = computed(() =>
        parsedType.value ? unitsData[parsedType.value].map(u => sym(u)) : []
      );

      const convertedValue = computed(() => {
        if (!parsedType.value || !targetUnit.value || parsedValue.value == null) return null;
        return convert(parsedValue.value, parsedUnit.value, targetUnit.value);
      });

      const formattedConverted = computed(() =>
        convertedValue.value != null ? bigFormat(convertedValue.value) : ''
      );

      /* === helpers === */

      const displayNameBySym = symb => {
        const flat = Object.values(unitsData).flat();
        const u = flat.find(x => sym(x) === symb);
        return u ? name(u) : symb;
      };

      const name = u => u.names?.[language.value]  || u.names.en;
      const sym  = u => u.symbol?.[language.value] || u.symbol.en;
      const appendSym = (s) => { inputText.value += s; };
      const unitsFlat = computed(() => Object.values(unitsData).flat());

      function parseInput() {
        const m = inputText.value.trim().match(/^(.+?)\s*([a-zA-Zа-яµ°]+)$/i);
        if (!m) { parsedType.value = ''; return; }

        let val;
        try { val = math.evaluate(m[1]); }
        catch { parsedType.value = ''; return; }

        const token = m[2].toLowerCase();
        const flat  = Object.values(unitsData).flat();
        const found = flat.find(u => u.aliases?.includes(token)) || flat.find(u => sym(u).toLowerCase() === token);
        if (!found) { parsedType.value = ''; return; }

        parsedValue.value = val;
        parsedUnit.value  = sym(found);
        parsedType.value  = Object.entries(unitsData).find(([, arr]) => arr.includes(found))[0];

        // Если user стёр «km» и набрал «kg» → меняем список targetOptions.
        // Если старая цель не входит в новый список — сбрасываем её.
        const allowed = unitsData[parsedType.value].map(u => sym(u));
        if (!allowed.includes(targetUnit.value)) {
          targetUnit.value = parsedType.value === 'temperature'
            ? 'K'
            : allowed[0]; // первая единица новой системы
        }
      }

      function convert(v, from, to) {
        if (parsedType.value === 'temperature') {
          return tempConv[from]?.(v)?.[to] ?? null;
        }
        const arr = unitsData[parsedType.value];
        const f = arr.find(u => sym(u).toLowerCase() === from.toLowerCase());
        const t = arr.find(u => sym(u).toLowerCase() === to.toLowerCase());
        return f && t ? v * (f.factor / t.factor) : null;
      }

      const swapUnits = () => {
        [targetUnit.value, parsedUnit.value] = [parsedUnit.value, targetUnit.value];
        parseInput();
      };

      function showFullTargetList () {
        /* Трюк: временно очищаем поле, чтобы браузер
           открыл datalist целиком, затем восстанавливаем значение */
        const v = targetUnit.value;
        targetUnit.value = '';
        // в следующем тике (event-loop) возвращаем
        requestAnimationFrame(() => { targetUnit.value = v; });
      }

      function onTargetTyped () {
        if (!targetOptions.value.includes(targetUnit.value)) return;
        /* нормализуем регистр (подсказки выдают lc) */
        targetUnit.value = targetOptions.value.find(u =>
          u.toLowerCase() === targetUnit.value.toLowerCase());
      }

      /* === dynSuggestions (заменяем существующую вычислилку) === */
      const dynSuggestions = computed(() => {
        const raw = inputText.value;
        const m = raw.match(/^(.*?)([a-zA-Zа-яµ°]*)$/);   // prefix + token
        if (!m) return [];

        const prefix = m[1];                              // «5 »  или «»
        const token  = (m[2] || '').toLowerCase();        // «k», «kg», …

        if (!token) return [];

        return unitsFlat.value
          .filter(u => {
            const pool = [sym(u), ...(u.aliases || [])].map(s => s.toLowerCase());
            return pool.some(s => s.startsWith(token));
          })
          .map(u => ({
            full : `${prefix}${sym(u)}`,   // ← value для datalist
            name : name(u),
            short: sym(u)
          }))
          .slice(0, 100);                  // защитимся от огромного списка
      });


      /* Если поле пустое и мы кликнули, показываем historyList */
      function onLeftFocus () {
        if (inputText.value.trim() === '') {
          // Chrome/Edge показывают datalist только если value пуст,
          // поэтому просто ничего не делаем – :list уже «historyList».
        }
      }

      /* === экспорт === */
      function exportExcel() {
        const ws = XLSXUtils.aoa_to_sheet([
          ['Unit','Symbol','Value'],
          ...unitsData[parsedType.value].map(u => [
            name(u), sym(u),
            bigFormat(convert(parsedValue.value, parsedUnit.value, sym(u)))
          ])
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'conversion.xlsx');
      }

      function exportPDF () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });

        // --- фиксированный английский шрифт/кегль ---
        doc.setFont('helvetica');
        doc.setFontSize(12);

        /* ---------- заголовок (тоже на EN) ---------- */
        const title = `Result: ${formattedConverted.value} ${targetUnit.value}`;
        doc.text(title, 14, 14);

        /* ---------- таблица ------------------------- */
        doc.autoTable({
          head: [['Unit', 'Symbol', 'Value']],       // <- статичный EN
          body: unitsData[parsedType.value].map(u => [
            u.names.en,                              // <- только English
            u.symbol.en,
            bigFormat(
              convert(parsedValue.value, parsedUnit.value, u.symbol.en)
            )
          ]),
          startY: 22,
          styles: { font: 'helvetica', fontSize: 10 }
        });

        doc.save('conversion.pdf');
      }


      /* === библиотека === */
      async function loadLib() {
        const res = await fetch(LIBRARY_PATH);
        const buf = await res.arrayBuffer();
        const wb  = XLSX.read(buf, { type: 'array' });
        const ws  = wb.Sheets[wb.SheetNames[0]];
        const data = XLSXUtils.sheet_to_json(ws, { defval: '' });

        if (tableInst) { tableInst.destroy(); tableInst = null; }
        tableInst = new Tabulator(tableHolder.value, {
          data,
          layout:'fitDataStretch',
          reactiveData:true,
          pagination:'local', paginationSize:50,
          columns: Object.keys(data[0] || {}).map(k => ({
            title:k, field:k, headerFilter:'input', sorter:'alphanum'
          })),
          locale:language.value
        });
      }

      const downloadTable = (fmt) => {
        if (!tableInst) return;
        fmt === 'pdf'
          ? tableInst.download('pdf','library.pdf',{orientation:'landscape'})
          : tableInst.download(fmt,`library.${fmt}`);
      };

      /* === реакции === */
      watch(language, l => {
        i18n.global.locale.value = l;
        tableInst && tableInst.setLocale(l);
      });

      watch(convertedValue, val => {
        if (val == null) return;
        history.value.unshift(inputText.value.trim());
        history.value = history.value.slice(0, MAX_HISTORY);
        localStorage.setItem('convHist', JSON.stringify(history.value));
      });

      onMounted(async () => { if (currentModule.value==='library') await loadLib(); });
      watch(currentModule, async n => {
        if (n === 'library') {
          await loadLib();
        } else if (tableInst) {
          tableInst.destroy();
          tableInst = null;
        }
      });

      /* === отдаём в шаблон === */
      return {
        currentModule, modules,
        language, languages,
        inputText, targetUnit, special: SPECIAL_SYMBOLS,
        parsedType, convertedValue, formattedConverted,
        history, targetOptions, tableHolder, dynSuggestions,
        unitsFlat, name, sym, displayNameBySym, onLeftFocus,
        /* methods */
        parseInput, swapUnits, appendSym, showFullTargetList, onTargetTyped,
        exportExcel, exportPDF, downloadTable
      };
    }
  });

  app.use(i18n).mount('#app');
});
