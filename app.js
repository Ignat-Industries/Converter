/* eslint-disable no-unused-vars */
/* global Vue, math, XLSX, Tabulator, jspdf */
import { i18n, loadMessages, supportedLangs } from './i18n.js';
import unitsData from './unitsData.js';

/* ==================================================================== */
/*  Г Л О Б А Л Ь Н Ы Е                                                  */
/* ==================================================================== */
let engHeader       = [];     // EN-заголовок              (init в loadLib)
let headerTranslate = null;   // строка-перевод            (init в loadLib)
let headerUnitsBase = null;   // строка единиц БЕЗ select  (init в loadLib)
let headerRowsCount = 1;      // сколько «служебных» строк (init в loadLib)

/* =======================================================================
 *  У Т И Л И Т Ы
 * ===================================================================== */
const MAX_HISTORY     = 10;
const SPECIAL_SYMBOLS = ['Ω', 'µ', '°', 'π', '×', '⁻¹'];
// вычисляем «/Converter/» или «/» динамически
const BASE = document.querySelector('base')?.href || window.location.pathname.replace(/\/[^/]*$/, '');
const LIBRARY_PATH = `${BASE}/data/raw/library.xlsx`;

/** Форматирует число для вывода */
function bigFormat(n) {
  const a = Math.abs(n);
  if (a >= 1e6 || (a && a <= 1e-6)) {
    return n.toExponential(6).replace(/e\+/, 'e');
  }
  return (Math.round(n * 1e12) / 1e12).toString();
}

/* noinspection JSNonASCIINames */ /* температурные формулы */
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

/* =======================================================================
 *  П Р И Л О Ж Е Н И Е
 * ===================================================================== */
loadMessages().then(() => {
  const { createApp, ref, computed, watch, onMounted, nextTick } = Vue;

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
        <div class="table-wrap">
          <div id="my-table" class="table-holder" ref="tableHolder"></div>
        </div>

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
      const tempUnit    = ref('°C');
      const TEMP_COLS   = ['Boiling Temperature','Critical temperature'];
      /** @type {Tabulator | null} */ let tableInst = null;
      let rawTableDataC = [];

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
      const appendSym = s => { inputText.value += s; };
      const unitsFlat = computed(() => Object.values(unitsData).flat());

      function parseInput() {
        const m = inputText.value.trim().match(/^(.+?)\s*([a-zA-Zа-яµ°]+)$/i);
        if (!m) { parsedType.value = ''; return; }

        let val;
        try { val = math.evaluate(m[1]); }
        catch { parsedType.value = ''; return; }

        const token = m[2].toLowerCase();
        const flat  = Object.values(unitsData).flat();
        const found = flat.find(u => u.aliases?.includes(token)) ||
                      flat.find(u => sym(u).toLowerCase() === token);
        if (!found) { parsedType.value = ''; return; }

        parsedValue.value = val;
        parsedUnit.value  = sym(found);
        parsedType.value  = Object.entries(unitsData).find(([, arr]) => arr.includes(found))[0];

        const allowed = unitsData[parsedType.value].map(u => sym(u));
        if (!allowed.includes(targetUnit.value)) {
          targetUnit.value = parsedType.value === 'temperature'
            ? 'K'
            : allowed[0];
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

      /** формирует объект-строку из engHeader -> {colName: value} */
      const buildNameRow = () =>
        Object.fromEntries(engHeader.map(col => [col, col]));

      /** фиксирует первые 2 или 3 строки (имена / единицы / перевод) */
      function freezeStaticRows() {
        if (!tableInst) return;
        const rows  = tableInst.getRows();
        const count = headerRowsCount;              // 2 или 3
        rows.slice(0, count).forEach(r => r.freeze());
      }

      function showFullTargetList () {
        const v = targetUnit.value;
        targetUnit.value = '';
        requestAnimationFrame(() => { targetUnit.value = v; });
      }

      function onTargetTyped () {
        if (!targetOptions.value.includes(targetUnit.value)) return;
        targetUnit.value = targetOptions.value.find(u =>
          u.toLowerCase() === targetUnit.value.toLowerCase());
      }

      /* === dynSuggestions === */
      const dynSuggestions = computed(() => {
        const raw = inputText.value;
        const m = raw.match(/^(.*?)([a-zA-Zа-яµ°]*)$/);
        if (!m) return [];

        const prefix = m[1];
        const token  = (m[2] || '').toLowerCase();
        if (!token) return [];

        return unitsFlat.value
          .filter(u => {
            const pool = [sym(u), ...(u.aliases || [])].map(s => s.toLowerCase());
            return pool.some(s => s.startsWith(token));
          })
          .map(u => ({
            full : `${prefix}${sym(u)}`,
            name : name(u),
            short: sym(u)
          }))
          .slice(0, 100);
      });

      function onLeftFocus () {
        /* historyList показывается автоматически, если value == '' */
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
        doc.setFont('helvetica');
        doc.setFontSize(12);
        const title = `Result: ${formattedConverted.value} ${targetUnit.value}`;
        doc.text(title, 14, 14);

        doc.autoTable({
          head: [['Unit', 'Symbol', 'Value']],
          body: unitsData[parsedType.value].map(u => [
            u.names.en,
            u.symbol.en,
            bigFormat(convert(parsedValue.value, parsedUnit.value, u.symbol.en))
          ]),
          startY: 22,
          styles: { font: 'helvetica', fontSize: 10 }
        });

        doc.save('conversion.pdf');
      }

      /* ======================  Б И Б Л И О Т Е К А  ======================= */
      async function loadLib () {
        await nextTick();                                            // дождаться DOM-mount

        /* ---------- читаем Excel -------------------------------------------------- */
        const res = await fetch(LIBRARY_PATH);
        if (!res.ok) { alert('Файл «library.xlsx» не найден.'); return; }

        const buf = await res.arrayBuffer();
        const wb  = XLSX.read(buf, { type: 'array' });
        const ws  = wb.Sheets[wb.SheetNames[0]];

        /* ---------- разбираем строки --------------------------------------------- */
        const rows      = XLSXUtils.sheet_to_json(ws, { header: 1, defval: '' });
        const hdrRaw    = rows[0];                 // 1-я строка → заголовок (c unit в скобках)
        const dataRaw   = rows.slice(1);           // остальное – данные

        /* ---------- вспомогалки --------------------------------------------------- */
        const toObj = arr => Object.fromEntries(arr.map((v, i) => [hdrRaw[i], v]));
        const TEMP_COLS = ['Boiling Temperature', 'Critical temperature'];   // «базовые» имена

        /* карта выбранных шкал для каждого t-столбца */
        const tempUnits = {};
        hdrRaw.forEach(h => {
          const base  = h.replace(/\s*\(.*$/, '').trim();
          const match = h.match(/\(([^)]+)\)/);
          if (TEMP_COLS.includes(base)) tempUnits[h] = match ? match[1] : '°C';
        });

        /* ---------- исходный набор (всегда °C) ----------------------------------- */
        rawTableDataC = dataRaw.map(toObj);

        /* ---------- конвертация строки в выбранные единицы ----------------------- */
        const convertRow = src => {
          const row = { ...src };
          Object.keys(tempUnits).forEach(col => {
            const v   = parseFloat(src[col]);
            const unt = tempUnits[col];            // «°C» / «K» / «°F»
            row[col]  = Number.isFinite(v)
              ? bigFormat(unt === '°C' ? v : tempConv['°C'](v)[unt])
              : src[col];
          });
          return row;
        };

        /* ---------- данные для рендера ------------------------------------------- */
        const tableData = rawTableDataC.map(convertRow);

        /* ---------- заголовки: текст + <select> для T-столбцов ------------------- */
        const showTrans = language.value !== 'en';
        const columns   = hdrRaw.map(col => {
          const base    = col.replace(/\s*\(.*$/, '').trim();          // «Boiling Temperature»
          const isTemp  = TEMP_COLS.includes(base);
          const trans   = showTrans ? i18n.global.t(`col_${base}`, base) : base;

          let titleHTML = trans;                                       // «Boiling Temperature»
          if (isTemp) {
            const sel = value => `<option value="${value}"${tempUnits[col]===value?' selected':''}>${value}</option>`;
            titleHTML += ` <select class="unitSel" data-col="${col}">
                             ${sel('°C')}${sel('K')}${sel('°F')}
                           </select>`;
          } else {
            const m = col.match(/\(([^)]+)\)/);                        // другие юниты «(bar)» и т.д.
            if (m) titleHTML += ` (${m[1]})`;
          }

          return {
            title: titleHTML,
            field: col,
            headerFilter: 'input',
            sorter: 'alphanum',
            formatter: 'html'
          };
        });

        /* ---------- создаём/пересоздаём Tabulator -------------------------------- */
        tableInst?.destroy();
        tableInst = new Tabulator(tableHolder.value, {
          data          : tableData,
          columns,
          layout        : 'fitDataStretch',
          reactiveData  : true,
          pagination    : 'local',
          paginationSize: 50,
          locale        : language.value,
          tableBuilt() {
            /* ---- вешаем обработчики на <select> в заголовках ---- */
            tableHolder.value.querySelectorAll('.unitSel').forEach(sel => {
              sel.addEventListener('click', e => e.stopPropagation());   // не триггерим сортировку
              sel.onchange = e => {
                const col    = e.target.dataset.col;
                tempUnits[col] = e.target.value;

                /* пересчёт только изменившегося столбца */
                const newData = tableInst.getData().map((row, idx) => {
                  const srcVal = rawTableDataC[idx][col];
                  const v      = parseFloat(srcVal);
                  row[col]     = Number.isFinite(v)
                    ? bigFormat(tempUnits[col] === '°C' ? v
                                : tempConv['°C'](v)[tempUnits[col]])
                    : srcVal;
                  return row;
                });
                tableInst.replaceData(newData);                         // мгновенно обновляем
              };
            });
          }
        });
      }


      function makeUnitRow (unit = '°C') {
        return engHeader.reduce((row, col) => {
          row[col] = TEMP_COLS.includes(col)
            ? `<select class="tempSel">
                 <option value="°C" ${unit==='°C'?'selected':''}>°C</option>
                 <option value="K"  ${unit==='K' ?'selected':''}>K</option>
                 <option value="°F" ${unit==='°F'?'selected':''}>°F</option>
               </select>`
            : headerUnitsBase[col];
          return row;
        }, {});
      }

      async function applyTempUnit(unit = tempUnit.value) {
        if (!tableInst || engHeader.length === 0) return;

        /* конвертируем сырой массив °C → unit */
        const conv = v => {
          const n = parseFloat(v);
          return Number.isFinite(n) ? bigFormat(tempConv['°C'](n)[unit]) : v;
        };
        const dataConverted = rawTableDataC.map(obj => {
          const row = { ...obj };
          TEMP_COLS.forEach(col => (row[col] = conv(row[col])));
          return row;
        });

        /* собираем новый data-массив в том же порядке */
        const data = [buildNameRow(), makeUnitRow(unit)];
        if (headerTranslate) data.push(headerTranslate);
        data.push(...dataConverted);

        await tableInst.replaceData(data);
        freezeStaticRows();                               // ← снова фиксируем

        tableHolder.value.querySelectorAll('.tempSel')
          .forEach(sel => sel.onchange =
            e => (tempUnit.value = e.target.value));
      }

      const downloadTable = fmt => {
        if (!tableInst) return;
        fmt === 'pdf'
          ? tableInst.download('pdf','library.pdf',{orientation:'landscape'})
          : tableInst.download(fmt,`library.${fmt}`);
      };

      /* === реакции === */
      watch(language, async l => {
        i18n.global.locale.value = l;
        tableInst?.setLocale(l);

        if (currentModule.value === 'library') {
          await loadLib();
          await applyTempUnit();
        }
      });

      watch(tempUnit, unit => applyTempUnit(unit));

      watch(convertedValue, val => {
        if (val == null) return;
        history.value.unshift(inputText.value.trim());
        history.value = history.value.slice(0, MAX_HISTORY);
        localStorage.setItem('convHist', JSON.stringify(history.value));
      });

      onMounted(async () => {
        if (currentModule.value === 'library') await loadLib();
      });

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
        unitsFlat, tempUnit,
        name, sym, displayNameBySym, onLeftFocus,
        /* methods */
        parseInput, swapUnits, appendSym, showFullTargetList, onTargetTyped,
        exportExcel, exportPDF, downloadTable
      };
    }
  });

  app.use(i18n).mount('#app');
});
