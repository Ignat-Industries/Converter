// unitsData.js
/* global makeUnit:false */  // подсказка линтеру: функция объявлена ниже

// --- ВСПОМОГАТЕЛЬНАЯ ФАБРИКА ----------------------------------------------
function makeUnit(names, symbol, factor, aliases = []) {
  return { names, symbol, factor, aliases };
}

// --- ВАШ ПОЛНЫЙ ОБЪЕКТ ЕДИНИЦ ---------------------------------------------
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

export default unitsData;
