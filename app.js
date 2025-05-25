// app.js
import { i18n, loadMessages, supportedLangs } from './i18n.js';

/**
 * Фабрика для создания юнита.
 * @param {object} names   — словарь { en:'...', ru:'...', es:'...', ... }
 * @param {object} symbol  — словарь { en:'...', ru:'...', es:'...', ... }
 * @param {number} factor  — коэффициент (пример: 1 для базовой)
 * @param {string[]} aliases — алиасы (например: ['lb','lbs'])
 */
function makeUnit(names, symbol, factor, aliases = []) {
  return { names, symbol, factor, aliases };
}

// Небольшая функция для форматирования больших/малых чисел
const bigFormat = (num) => {
  const a = Math.abs(num);
  return (a >= 1e6 || (a <= 1e-6 && a !== 0))
    ? num.toExponential(6).replace(/e\+/, 'e')
    : num.toLocaleString(undefined, { maximumFractionDigits: 12 });
};

const MAX_HISTORY = 10;

// Набор единиц — часть переведена на все 10 языков (пример meter, kilometer, inch...).
// Остальные указаны сокращённо (en + ru), вы можете дописать переводы по аналогии.
const unitsData = {
  length: [
    // Полностью переведённый пример (meter)
    makeUnit(
      {
        en: 'meter',
        ru: 'метр',
        es: 'metro',
        de: 'Meter',
        fr: 'mètre',
        zh: '米',
        pt: 'metro',
        ar: 'متر',
        hi: 'मीटर',
        ja: 'メートル'
      },
      {
        en: 'm',
        ru: 'м',
        es: 'm',
        de: 'm',
        fr: 'm',
        zh: 'm',
        pt: 'm',
        ar: 'م',
        hi: 'm',
        ja: 'm'
      },
      1,
      ['m', 'м']
    ),

    // Тоже полностью (kilometer)
    makeUnit(
      {
        en: 'kilometer',
        ru: 'километр',
        es: 'kilómetro',
        de: 'Kilometer',
        fr: 'kilomètre',
        zh: '千米',
        pt: 'quilômetro',
        ar: 'كيلومتر',
        hi: 'किलोमीटर',
        ja: 'キロメートル'
      },
      {
        en: 'km',
        ru: 'км',
        es: 'km',
        de: 'km',
        fr: 'km',
        zh: 'km',
        pt: 'km',
        ar: 'كم',
        hi: 'km',
        ja: 'km'
      },
      1e3,
      ['km', 'км']
    ),

    // Тоже полностью (inch)
    makeUnit(
      {
        en: 'inch',
        ru: 'дюйм',
        es: 'pulgada',
        de: 'Zoll',
        fr: 'pouce',
        zh: '英寸',
        pt: 'polegada',
        ar: 'بوصة',
        hi: 'इंच',
        ja: 'インチ'
      },
      {
        en: 'in',
        ru: 'дюйм', // Можно оставить 'in', если хотите
        es: 'in',
        de: 'in',
        fr: 'in',
        zh: 'in',
        pt: 'in',
        ar: 'in',
        hi: 'in',
        ja: 'in'
      },
      0.0254,
      ['in', 'дюйм']
    ),

    makeUnit(
  {
    en: 'foot',
    ru: 'фут',
    es: 'pie',
    de: 'Fuß',
    fr: 'pied',
    zh: '英尺',
    pt: 'pé',
    ar: 'قدم',
    hi: 'फुट',
    ja: 'フィート'
  },
  {
    en: 'ft',
    ru: 'фт',
    es: 'ft',
    de: 'ft',
    fr: 'ft',
    zh: 'ft',
    pt: 'ft',
    ar: 'ft',
    hi: 'ft',
    ja: 'ft'
  },
  0.3048,
  ['ft', 'фут']
),

  makeUnit(
    {
      en: 'yard',
      ru: 'ярд',
      es: 'yarda',
      de: 'Yard',
      fr: 'yard',
      zh: '码',
      pt: 'jarda',
      ar: 'ياردة',
      hi: 'गज',
      ja: 'ヤード'
    },
    {
      en: 'yd',
      ru: 'ярд',   // Можно оставить "yd", если хотите единый символ
      es: 'yd',
      de: 'yd',
      fr: 'yd',
      zh: 'yd',
      pt: 'yd',
      ar: 'yd',
      hi: 'yd',
      ja: 'yd'
    },
    0.9144),
  ],

  mass: [
    // Пример полностью (kilogram) с переводом
    makeUnit(
      {
        en: 'kilogram',
        ru: 'килограмм',
        es: 'kilogramo',
        de: 'Kilogramm',
        fr: 'kilogramme',
        zh: '千克',
        pt: 'quilograma',
        ar: 'كيلوجرام',
        hi: 'किलोग्राम',
        ja: 'キログラム'
      },
      {
        en: 'kg',
        ru: 'кг',
        es: 'kg',
        de: 'kg',
        fr: 'kg',
        zh: 'kg',
        pt: 'kg',
        ar: 'كجم',
        hi: 'kg',
        ja: 'kg'
      },
      1,
      ['kg', 'кг']
    ),

    makeUnit(
    {
      en: 'pound',
      ru: 'фунт',
      es: 'libra',
      de: 'Pfund',
      fr: 'livre',
      zh: '磅',
      pt: 'libra',
      ar: 'رطل',
      hi: 'पाउंड',
      ja: 'ポンド'
    },
    {
      en: 'lb',
      ru: 'фунт',
      es: 'lb',
      de: 'lb',
      fr: 'lb',
      zh: 'lb',
      pt: 'lb',
      ar: 'lb',
      hi: 'lb',
      ja: 'lb'
    },
    0.45359237,
    ['lb','lbs']
  )

  ],

  time: [
    // Пример (second) полностью
    makeUnit(
      {
        en: 'second',
        ru: 'секунда',
        es: 'segundo',
        de: 'Sekunde',
        fr: 'seconde',
        zh: '秒',
        pt: 'segundo',
        ar: 'ثانية',
        hi: 'सेकंड',
        ja: '秒'
      },
      {
        en: 's',
        ru: 'с',
        es: 's',
        de: 's',
        fr: 's',
        zh: 's',
        pt: 's',
        ar: 'ث',
        hi: 's',
        ja: 's'
      },
      1,
      ['sec', 'с']
    ),
    makeUnit(
  {
    en: 'minute',
    ru: 'минута',
    es: 'minuto',
    de: 'Minute',
    fr: 'minute',
    zh: '分钟',
    pt: 'minuto',
    ar: 'دقيقة',
    hi: 'मिनट',
    ja: '分'
  },
  {
    en: 'min',
    ru: 'мин',
    es: 'min',
    de: 'min',
    fr: 'min',
    zh: 'min',
    pt: 'min',
    ar: 'min',
    hi: 'min',
    ja: 'min'
  },
  60,
  ['min','мин']
),
makeUnit(
  {
    en: 'hour',
    ru: 'час',
    es: 'hora',
    de: 'Stunde',
    fr: 'heure',
    zh: '小时',
    pt: 'hora',
    ar: 'ساعة',
    hi: 'घंटा',
    ja: '時間'
  },
  {
    en: 'h',
    ru: 'ч',
    es: 'h',
    de: 'h',
    fr: 'h',
    zh: 'h',
    pt: 'h',
    ar: 'h',
    hi: 'h',
    ja: 'h'
  },
  3600,
  ['hr','h']
),
makeUnit(
  {
    en: 'day',
    ru: 'день',
    es: 'día',
    de: 'Tag',
    fr: 'jour',
    zh: '天',
    pt: 'dia',
    ar: 'يوم',
    hi: 'दिन',
    ja: '日'
  },
  {
    en: 'd',
    ru: 'д',
    es: 'd',
    de: 'd',
    fr: 'd',
    zh: 'd',
    pt: 'd',
    ar: 'd',
    hi: 'd',
    ja: 'd'
  },
  86400
),
makeUnit(
  {
    en: 'week',
    ru: 'неделя',
    es: 'semana',
    de: 'Woche',
    fr: 'semaine',
    zh: '星期',
    pt: 'semana',
    ar: 'أسبوع',
    hi: 'सप्ताह',
    ja: '週間'
  },
  {
    en: 'wk',
    ru: 'нед',
    es: 'wk',
    de: 'wk',
    fr: 'wk',
    zh: 'wk',
    pt: 'wk',
    ar: 'wk',
    hi: 'wk',
    ja: 'wk'
  },
  604800,
  ['week']
),
makeUnit(
  {
    en: 'year',
    ru: 'год',
    es: 'año',
    de: 'Jahr',
    fr: 'an',
    zh: '年',
    pt: 'ano',
    ar: 'سنة',
    hi: 'साल',
    ja: '年'
  },
  {
    en: 'yr',
    ru: 'год',
    es: 'yr',
    de: 'yr',
    fr: 'yr',
    zh: 'yr',
    pt: 'yr',
    ar: 'yr',
    hi: 'yr',
    ja: 'yr'
  },
  31557600,
  ['yr','год']
),

  ],

  temperature: [
    {
      names: {
        en: 'Celsius',    ru: 'Цельсий',
        es: 'Celsius',    de: 'Celsius',
        fr: 'Celsius',    zh: '摄氏度',
        pt: 'Celsius',    ar: 'سلزيوس',
        hi: 'सेल्सियस',   ja: '摂氏'
      },
      symbol: {
        en: '°C', ru: '°C', es: '°C', de: '°C',
        fr: '°C', zh: '°C', pt: '°C', ar: '°C',
        hi: '°C', ja: '°C'
      }
    },
    {
      names: {
        en: 'Fahrenheit',  ru: 'Фаренгейт',
        es: 'Fahrenheit',  de: 'Fahrenheit',
        fr: 'Fahrenheit',  zh: '华氏度',
        pt: 'Fahrenheit',  ar: 'فهرनهايت',
        hi: 'फारेनहाइट',    ja: '華氏'
      },
      symbol: {
        en: '°F', ru: '°F', es: '°F', de: '°F',
        fr: '°F', zh: '°F', pt: '°F', ar: '°F',
        hi: '°F', ja: '°F'
      }
    },
    {
      names: {
        en: 'Kelvin',   ru: 'Кельвин',
        es: 'Kelvin',   de: 'Kelvin',
        fr: 'Kelvin',   zh: '开尔文',
        pt: 'Kelvin',   ar: 'كلفن',
        hi: 'केल्विन',   ja: 'ケルビン'
      },
      symbol: {
        en: 'K', ru: 'K', es: 'K', de: 'K',
        fr: 'K', zh: 'K', pt: 'K', ar: 'K',
        hi: 'K', ja: 'K'
      }
    }
  ]
};

// Температурные конверторы (не меняются)
const tempConv = {
  '°C': (v) => ({
    '°C': v,
    '°F': v * 9 / 5 + 32,
    'K': v + 273.15
  }),
  '°F': (v) => ({
    '°C': (v - 32) * 5 / 9,
    '°F': v,
    'K': (v - 32) * 5 / 9 + 273.15
  }),
  'K': (v) => ({
    '°C': v - 273.15,
    '°F': (v - 273.15) * 9 / 5 + 32,
    'K': v
  })
};

// Асинхронно загружаем переводы, затем создаём Vue-приложение
loadMessages().then(() => {
  const app = Vue.createApp({
    template: `
      <!-- Language selector -->
      <div class="lang-select">
        <select v-model="language">
          <option v-for="lang in languages" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </div>

      <!-- Заголовок: теперь переводится при смене языка -->
      <h1>{{ $t('title') }}</h1>

      <!-- Input row -->
      <div class="input-row">
        <input
          type="text"
          v-model="inputText"
          :placeholder="$t('example')"
          @input="parseInput"
          list="historyList"
        />

        <button class="swap-btn" @click="swapUnits">⇄</button>

        <input
          type="text"
          v-model="targetUnit"
          :placeholder="$t('toUnit')"
          list="unit-suggestions"
        />
      </div>

      <!-- Datalist для всех юнитов -->
      <datalist id="unit-suggestions">
        <option
          v-for="(unit, idx) in unitsFlat"
          :key="idx"
          :value="displaySymbol(unit)"
        >
          {{ displayName(unit) }} ({{ displaySymbol(unit) }})
        </option>
      </datalist>

      <!-- Datalist ИСТОРИИ (вместо отдельного блока "history") -->
      <datalist id="historyList">
        <option
          v-for="item in history"
          :key="item.id"
          :value="item.text"
        >
        </option>
      </datalist>

      <!-- Результат -->
      <div class="result" v-if="convertedValue !== null">
        {{ $t('result') }}: {{ formattedConverted }} {{ targetUnit }}
      </div>

      <!-- Экспорт кнопки -->
      <div class="export-row" v-if="parsedType">
        <button class="btn" @click="exportToExcel">{{ $t('export_excel') }}</button>
        <button class="btn" @click="exportToPDF">{{ $t('export_pdf') }}</button>
      </div>

      <!-- Таблица -->
      <div class="table-wrapper" v-if="parsedType">
        <table>
          <thead>
            <tr>
              <th>{{ $t('unit') }}</th>
              <th>{{ $t('symbol') }}</th>
              <th>{{ $t('value') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, idx) in units[parsedType]" :key="idx">
              <td>{{ displayName(unit) }}</td>
              <td>{{ displaySymbol(unit) }}</td>
              <td>{{ formatValue(parsedType, parsedValue, unit) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- История блок мы убрали -->
    `,

    data() {
      return {
        inputText: '',
        targetUnit: '',
        parsedValue: null,
        parsedType: '',
        parsedUnit: '',
        language: 'en',  // по умолчанию
        history: [],

        // Список кодов + отображаемое название в select
        languages: supportedLangs.map(code => ({
          code,
          name: {
            en: 'English',
            ru: 'Русский',
            es: 'Español',
            de: 'Deutsch',
            fr: 'Français',
            zh: '中文',
            pt: 'Português',
            ar: 'العربية',
            hi: 'हिन्दी',
            ja: '日本語'
          }[code] || code
        }))
      };
    },

    computed: {
      units() {
        return unitsData;
      },
      unitsFlat() {
        return Object.values(this.units).flat();
      },
      convertedValue() {
        if (!this.parsedType || !this.targetUnit || this.parsedValue === null) {
          return null;
        }
        return this.convertToTarget(this.parsedValue, this.parsedUnit, this.targetUnit);
      },
      formattedConverted() {
        return (this.convertedValue !== null)
          ? bigFormat(this.convertedValue)
          : '';
      }
    },

    methods: {
      displayName(u) {
        return u.names?.[this.language] || u.names?.en || '';
      },
      displaySymbol(u) {
        return u.symbol?.[this.language] || u.symbol?.en || '';
      },

      parseInput() {
        const txt = this.inputText.trim();
        if (!txt) return;

        // Пример: "5 km"
        const match = txt.match(/^(.+?)\s*([a-zA-Zа-яµ°]+)$/);
        if (!match) {
          this.parsedType = '';
          return;
        }
        const valExpr = match[1];
        const unitToken = match[2];

        let val;
        try {
          val = math.evaluate(valExpr);
        } catch (e) {
          this.parsedType = '';
          return;
        }

        // Ищем юнит
        const found =
          this.unitsFlat.find(u => u.aliases && u.aliases.includes(unitToken)) ||
          this.unitsFlat.find(u => this.displaySymbol(u) === unitToken);

        if (!found) {
          this.parsedType = '';
          return;
        }

        this.parsedValue = val;
        this.parsedUnit = this.displaySymbol(found);

        // Определяем категорию
        this.parsedType = Object.entries(this.units)
          .find(([cat, arr]) => arr.includes(found))[0];

        // Если targetUnit не задан — подставим дефолт
        if (!this.targetUnit) {
          if (this.parsedType === 'temperature') {
            this.targetUnit = 'K';
          } else {
            this.targetUnit = this.displaySymbol(
              this.units[this.parsedType][0]
            );
          }
        }
      },

      convertToTarget(value, fromSym, toSym) {
        if (this.parsedType === 'temperature') {
          const table = tempConv[fromSym]?.(value);
          return table?.[toSym] ?? null;
        }
        const arr = this.units[this.parsedType];
        const from = arr.find(u => this.displaySymbol(u) === fromSym);
        const to = arr.find(u => this.displaySymbol(u) === toSym);
        if (!from || !to) return null;

        return value * (from.factor / to.factor);
      },

      formatValue(type, val, unit) {
        if (type === 'temperature') {
          const table = tempConv[this.parsedUnit]?.(val);
          const sym = this.displaySymbol(unit);
          return (table && table[sym] != null)
            ? bigFormat(table[sym])
            : '';
        }
        // Иное (length, mass, time...)
        const arr = this.units[type];
        const base = arr.find(u => this.displaySymbol(u) === this.parsedUnit);
        const converted = val * (base.factor / unit.factor);
        return bigFormat(converted);
      },

      swapUnits() {
        const tmp = this.targetUnit;
        this.targetUnit = this.parsedUnit;
        this.parsedUnit = tmp;
        this.parseInput();
      },

      // Экспорт в Excel
      exportToExcel() {
        const ws = XLSX.utils.aoa_to_sheet([
          [this.$t('unit'), this.$t('symbol'), this.$t('value')],
          ...this.units[this.parsedType].map(u => [
            this.displayName(u),
            this.displaySymbol(u),
            this.formatValue(this.parsedType, this.parsedValue, u)
          ])
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'conversion.xlsx');
      },

      exportToPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.setFontSize(12);

        doc.text(
          this.$t('result') + ': ' +
          this.formattedConverted + ' ' + this.targetUnit,
          14, 14
        );

        let y = 24;
        doc.text([
          this.$t('unit'),
          this.$t('symbol'),
          this.$t('value')
        ].join('   '), 14, y);

        y += 6;
        this.units[this.parsedType].forEach(u => {
          doc.text([
            this.displayName(u),
            this.displaySymbol(u),
            this.formatValue(this.parsedType, this.parsedValue, u)
          ].join('   '), 14, y);
          y += 6;
        });

        doc.save('conversion.pdf');
      }
    },

    watch: {
      // При смене языка переключаем i18n
      language(lang) {
        i18n.global.locale = lang;
        if (!this.parsedType) return;

        // Пересчитываем символьные обозначения
        const arr = this.units[this.parsedType];
        const mapSym = (oldSym) => {
          return arr.find(u =>
            u.aliases?.includes(oldSym) ||
            Object.values(u.symbol || {}).includes(oldSym)
          );
        };

        const foundParsed = mapSym(this.parsedUnit);
        const foundTarget = mapSym(this.targetUnit);

        if (foundParsed) this.parsedUnit = this.displaySymbol(foundParsed);
        if (foundTarget) this.targetUnit = this.displaySymbol(foundTarget);
      },

      // Запись в историю
      convertedValue(val) {
        if (val == null) return;
        const text = `${this.inputText} → ${bigFormat(val)} ${this.targetUnit}`;
        this.history.unshift({ id: Date.now(), text });
        if (this.history.length > MAX_HISTORY) {
          this.history.pop();
        }
      }
    }
  });

  // Подключаем i18n к приложению
  app.use(i18n);
  // Монтируем в #app (в index.html)
  app.mount('#app');
});
