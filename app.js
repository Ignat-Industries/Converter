/* eslint-disable no-unused-vars */
/* global Vue, math, XLSX, Tabulator, jspdf */
import { i18n, loadMessages, supportedLangs } from './i18n.js';
import unitsData from './unitsData.js';

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
        <!-- верхний горизонтальный скролл -->
        <div class="top-scroll" ref="topScroll"></div>
        <!-- сама таблица -->
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
      const tempUnit    = ref('°C');          // новая реактивная переменная
      const topScroll   = ref(null);
      const TEMP_COLS   = ['Boiling Temperature','Critical temperature'];
      /** @type {Tabulator | null} */ let tableInst = null;
      let rawTableDataC = [];                 // хранит «исходные» °C для пересчёта
      let headerRowsCount = 1;

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

      /* ---------- синхронизация скроллов -------------------------- */
      function syncScrollbars () {
        const bot = tableHolder.value?.querySelector('.tabulator-tableHolder');
        const top = topScroll.value;
        if (!bot || !top) return;                     // ждём, пока Tabulator построится

        /* прокладка для переполнения */
        top.innerHTML =
          `<div style="width:${bot.scrollWidth}px;height:1px"></div>`;

        const sync = e =>
          (e.target === bot)
            ? (top.scrollLeft = bot.scrollLeft)
            : (bot.scrollLeft = top.scrollLeft);

        bot.removeEventListener('scroll', sync);
        top.removeEventListener('scroll', sync);
        bot.addEventListener('scroll', sync, { passive: true });
        top.addEventListener('scroll', sync, { passive: true });

        /* гарантируем повтор через 1 тик ─ теперь bot.scrollWidth уже финальный */
        requestAnimationFrame(() => {
          if (document.body.contains(top)) syncScrollbars();
        });
      }

      /* === библиотека === */
      async function loadLib () {
        /* ---------- загрузка файла ---------------------------------- */
        const res = await fetch(LIBRARY_PATH);
        if (!res.ok) {
          alert('Файл «library.xlsx» не найден.');
          return;
        }
        const buf = await res.arrayBuffer();
        const wb  = XLSX.read(buf, { type: 'array' });
        const ws  = wb.Sheets[wb.SheetNames[0]];

        /* ---------- разбор строк листа ------------------------------ */
        const rows = XLSXUtils.sheet_to_json(ws, { header: 1, defval: '' });
        const [engHeader, unitRowRaw, ...rawData] = rows;

        /* ---------- будет ли перевод заголовка? ---------------------- */
        const showTrans = language.value !== 'en';
        headerRowsCount = showTrans ? 2 : 1;    // запоминаем
        const t         = i18n.global;
        const trHeader  = engHeader.map(col => t.t(`col_${col}`, col));

        /* ---------- строка единиц (селект для температур) ----------- */
        const unitRow = engHeader.map(col =>
          TEMP_COLS.includes(col)
            ? `<select class="tempSel">
                 <option value="°C">°C</option>
                 <option value="K">K</option>
                 <option value="°F">°F</option>
               </select>`
            : unitRowRaw[engHeader.indexOf(col)]
        );

        /* ---------- массивы → объекты ------------------------------- */
        const toObj = arr => Object.fromEntries(arr.map((v, i) => [engHeader[i], v]));
        rawTableDataC = rawData.map(toObj);          // сырец в °C

        /* ---------- объединяем служебные + данные ------------------- */
        let data = [toObj(unitRow), ...rawTableDataC];
        if (showTrans) data.unshift(toObj(trHeader));

        /* ---------- пересоздаём Tabulator ---------------------------- */
        if (tableInst) tableInst.destroy();

        tableInst = new Tabulator(tableHolder.value, {
          data,
          layout: 'fitDataStretch',
          reactiveData: true,
          pagination: 'local',
          paginationSize: 50,
          locale: language.value,
          columns: engHeader.map(k => ({
            title: k,
            field: k,
            headerFilter: 'input',
            sorter: 'alphanum',
            formatter: 'html'
          })),

          /**  ---------- ВСЁ, что раньше было в tableInst.on('tableBuilt') ---------- */
          tableBuilt() {
            /* фиксируем служебные строки */
            const rows = this.getRows();
            if (showTrans) rows[0]?.freeze();          // перевод
            rows[showTrans ? 1 : 0]?.freeze();         // единицы

            /* селекты °C / K / °F */
            tableHolder.value
              .querySelectorAll('.tempSel')
              .forEach(sel => {
                sel.value    = tempUnit.value;               // актуальная шкала
                sel.onchange = e => (tempUnit.value = e.target.value);
              });

            /* «прокладка» + синхронизация скроллов */
            syncScrollbars();
          }
        });

        /* ---------- синхронизация скроллов -------------------------- */
        const syncScrollbars = () => {
          const bot = tableHolder.value.querySelector('.tabulator-tableHolder');
          const top = topScroll.value;
          if (!bot || !top) return;

          /* подгоняем ширину «прокладки» под фактическую ширину таблицы */
          top.innerHTML = `<div style="width:${bot.scrollWidth}px;height:1px"></div>`;

          const sync = e => {
            if (e.target === bot) top.scrollLeft = bot.scrollLeft;
            else                  bot.scrollLeft = top.scrollLeft;
          };
          bot.removeEventListener('scroll', sync);   // страховка от дубликатов
          top.removeEventListener('scroll', sync);
          bot.addEventListener('scroll', sync, { passive: true });
          top.addEventListener('scroll', sync, { passive: true });
        };

        /* ---------- после полной отрисовки -------------------------- */
        return new Promise(resolve => {
          tableInst.on('tableBuilt', () => {
            /* фиксируем строки */
            if (showTrans) tableInst.getRows()[0]?.freeze();
            tableInst.getRows()[showTrans ? 1 : 0]?.freeze();

            /* селекты в строке единиц */
            tableHolder.value.querySelectorAll('.tempSel').forEach(sel => {
              sel.value = tempUnit.value;
              sel.onchange = e => (tempUnit.value = e.target.value);
            });

            syncScrollbars();   // ← один-единственный вызов
            resolve();          // <- «готово»
          });
        });
      }

      const downloadTable = (fmt) => {
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
          await loadLib();          // дождёмся новой таблицы
          applyTempUnit();          // и только потом конвертируем °C → выбранная
        }
      });

      function applyTempUnit(unit = tempUnit.value){
        if (!tableInst) return;

        const conv = v => {
          const n = parseFloat(v);
          return Number.isNaN(n) ? v : bigFormat(tempConv['°C'](n)[unit]);
        };

        /* строим НОВЫЙ массив, rawTableDataC не изменяем */
        const data = rawTableDataC.map(obj => {
          const row = { ...obj };
          TEMP_COLS.forEach(c => { row[c] = conv(row[c]); });
          return row;
        });

        const hdr = tableInst.getData().slice(0, headerRowsCount);
        tableInst.replaceData([...hdr, ...data]);

        /* селекты + прокрутка */
        tableHolder.value.querySelectorAll('.tempSel')
          .forEach(sel => { sel.value = unit; });
        syncScrollbars();
      }

      /* --- реагируем на смену шкалы температуры --- */
      watch(tempUnit, unit => applyTempUnit(unit));

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
        unitsFlat, topScroll, tempUnit,
        name, sym, displayNameBySym, onLeftFocus,
        /* methods */
        parseInput, swapUnits, appendSym, showFullTargetList, onTargetTyped,
        exportExcel, exportPDF, downloadTable
      };
    }
  });

  app.use(i18n).mount('#app');
});
