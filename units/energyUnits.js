/* energyUnits.js  –  все джоули и калории с 24-приставками      */
/* eslint-disable max-len */

function makeUnit(names, symbol, factor, aliases = []) {
  return { names, symbol, factor, aliases };
}

/* ISO 80000-1 + ronna/quetta (символLatin, символRU, фактор) */
const prefixes = [
  ['q','кв',1e-30, {en:'quecto',ru:'квекто',es:'quecto',de:'Quecto',fr:'quecto',zh:'昆托',pt:'quecto',ar:'كويكتو',hi:'क्वेक्टो',ja:'クエクト'}],
  ['r','рн',1e-27, {en:'ronto', ru:'ронто', es:'ronto', de:'Ronto', fr:'ronto', zh:'仑托', pt:'ronto',  ar:'رونتو', hi:'रोंटो', ja:'ロント'}],
  ['y','и', 1e-24, {en:'yocto', ru:'иокто', es:'yocto', de:'Yocto', fr:'yocto', zh:'仄托', pt:'yocto',  ar:'يوكتو',hi:'योक्टो',ja:'ヨクト'}],
  ['z','з', 1e-21, {en:'zepto', ru:'зепто', es:'zepto', de:'Zepto', fr:'zepto', zh:'介托', pt:'zepto',  ar:'زبتو', hi:'ज़ेप्टो',ja:'ゼプト'}],
  ['a','а', 1e-18, {en:'atto',  ru:'атто',  es:'atto',  de:'Atto',  fr:'atto',  zh:'阿托', pt:'atto',   ar:'أتو',  hi:'एट्टो', ja:'アト'}],
  ['f','ф', 1e-15, {en:'femto', ru:'фемто', es:'femto', de:'Femto', fr:'femto', zh:'飞托', pt:'femto',  ar:'فيمتو',hi:'फेम्टो',ja:'フェムト'}],
  ['p','п', 1e-12, {en:'pico',  ru:'пико',  es:'pico',  de:'Piko',  fr:'pico',  zh:'皮',   pt:'pico',   ar:'بيكو',hi:'पिको', ja:'ピコ'}],
  ['n','н', 1e-9 , {en:'nano',  ru:'нано',  es:'nano',  de:'Nano',  fr:'nano',  zh:'纳',   pt:'nano',   ar:'نانو', hi:'नैनो', ja:'ナノ'}],
  ['µ','мк',1e-6 , {en:'micro', ru:'микро', es:'micro', de:'Mikro', fr:'micro', zh:'微',   pt:'micro',  ar:'ميكرو',hi:'माइक्रो',ja:'マイクロ'}],
  ['m','м', 1e-3 , {en:'milli', ru:'милли', es:'mili',  de:'Milli', fr:'milli', zh:'毫',   pt:'mili',   ar:'ميلي', hi:'मिली', ja:'ミリ'}],
  ['c','с', 1e-2 , {en:'centi', ru:'санти', es:'centi', de:'Zenti', fr:'centi', zh:'厘',   pt:'centi',  ar:'سنتي', hi:'सेंटी',ja:'センチ'}],
  ['d','д', 1e-1 , {en:'deci',  ru:'деци',  es:'deci',  de:'Dezi',  fr:'déci',  zh:'迪',   pt:'deci',   ar:'ديسي', hi:'डेसी', ja:'デシ'}],
  ['da','да',1e+1 , {en:'deca',  ru:'дека',  es:'deca',  de:'Deka',  fr:'déca',  zh:'十',   pt:'deca',   ar:'ديكا', hi:'डेका', ja:'デカ'}],
  ['h','г', 1e+2 , {en:'hecto', ru:'гекто', es:'hecto', de:'Hekto', fr:'hecto', zh:'百',   pt:'hecto',  ar:'هكتو', hi:'हेक्टो',ja:'ヘクト'}],
  ['k','к', 1e+3 , {en:'kilo',  ru:'кило',  es:'kilo',  de:'Kilo',  fr:'kilo',  zh:'千',   pt:'quilo',  ar:'كيلو', hi:'किलो', ja:'キロ'}],
  ['M','М', 1e+6 , {en:'mega',  ru:'мега',  es:'mega',  de:'Mega',  fr:'méga',  zh:'兆',   pt:'mega',   ar:'ميغا', hi:'मेगा', ja:'メガ'}],
  ['G','Г', 1e+9 , {en:'giga',  ru:'гига',  es:'giga',  de:'Giga',  fr:'giga',  zh:'吉',   pt:'giga',   ar:'غيغا', hi:'गीगा', ja:'ギガ'}],
  ['T','Т', 1e+12, {en:'tera',  ru:'тера',  es:'tera',  de:'Tera',  fr:'téra',  zh:'太',   pt:'tera',   ar:'تيرا', hi:'टेरा', ja:'テラ'}],
  ['P','П', 1e+15, {en:'peta',  ru:'пета',  es:'peta',  de:'Peta',  fr:'péta',  zh:'拍',   pt:'peta',   ar:'بيتا', hi:'पेटा', ja:'ペタ'}],
  ['E','Э', 1e+18, {en:'exa',   ru:'экса',  es:'exa',   de:'Exa',   fr:'exa',   zh:'艾',   pt:'exa',    ar:'إكسا', hi:'एक्सा',ja:'エクサ'}],
  ['Z','З', 1e+21, {en:'zetta', ru:'зетта', es:'zetta', de:'Zetta', fr:'zetta', zh:'泽',   pt:'zetta',  ar:'زيتا', hi:'जेट्टा',ja:'ゼタ'}],
  ['Y','И', 1e+24, {en:'yotta', ru:'йотта', es:'yotta', de:'Yotta', fr:'yotta', zh:'尧',   pt:'yotta',  ar:'يوتا', hi:'योट्टा',ja:'ヨタ'}],
  ['R','Рн',1e+27, {en:'ronna', ru:'ронна', es:'ronna', de:'Ronna', fr:'ronna', zh:'罗纳', pt:'ronna',  ar:'رونا', hi:'रोनना',ja:'ロナ'}],
  ['Q','Кв',1e+30, {en:'quetta',ru:'кветта',es:'quetta',de:'Quetta',fr:'quetta',zh:'圭塔',pt:'quetta', ar:'كيتا', hi:'क्वेटा',ja:'クエタ'}]
];

/* базовые слова */
const wordJ  = {en:'joule',  ru:'джоуль',   es:'julio',   de:'Joule',  fr:'joule', zh:'焦耳', pt:'joule',  ar:'جول',   hi:'जूल', ja:'ジュール'};
const wordCal={en:'calorie',ru:'калория',  es:'caloría', de:'Kalorie',fr:'calorie',zh:'卡路里',pt:'caloria',ar:'سعرة', hi:'कैलोरी',ja:'カロリー'};

/* helper формирует names по 10 языкам */
const buildNames = (pfxDict, baseDict) =>
  Object.fromEntries(Object.keys(baseDict).map(l => [l, `${pfxDict[l]}${baseDict[l]}`]));

/* алиасы */
const mkAlias = (symLat, symRu, base) => [symLat + base, symRu + (base === 'J' ? 'Дж' : 'кал')];

const energy = [];

/* 0) базовые ------------------------------------------------------------- */
energy.push(
  makeUnit(buildNames({en:'',ru:'',es:'',de:'',fr:'',zh:'',pt:'',ar:'',hi:'',ja:''}, wordJ),
           {en:'J',ru:'Дж',es:'J',de:'J',fr:'J',zh:'J',pt:'J',ar:'J',hi:'J',ja:'J'},
           1,['J','Дж']),
  makeUnit(buildNames({en:'',ru:'',es:'',de:'',fr:'',zh:'',pt:'',ar:'',hi:'',ja:''}, wordCal),
           {en:'cal',ru:'кал',es:'cal',de:'cal',fr:'cal',zh:'cal',pt:'cal',ar:'cal',hi:'cal',ja:'cal'},
           4.1868,['cal','кал'])
);

/* 1) приставки ----------------------------------------------------------- */
prefixes.forEach(([lat,ruSym,k,dict])=>{
  /* J-вариант */
  energy.push(
    makeUnit(buildNames(dict, wordJ),
      {en:`${lat}J`,ru:`${ruSym}Дж`,es:`${lat}J`,de:`${lat}J`,fr:`${lat}J`,zh:`${lat}J`,
       pt:`${lat}J`,ar:`${lat}J`,hi:`${lat}J`,ja:`${lat}J`},
      k,['J','Дж'].map(a=>a.replace(/J|Дж/, lat+'$&')) /* простейший alias */
    )
  );
  /* cal-вариант */
  energy.push(
    makeUnit(buildNames(dict, wordCal),
      {en:`${lat}cal`,ru:`${ruSym}кал`,es:`${lat}cal`,de:`${lat}cal`,fr:`${lat}cal`,zh:`${lat}cal`,
       pt:`${lat}cal`,ar:`${lat}cal`,hi:`${lat}cal`,ja:`${lat}cal`},
      k*4.1868,['cal','кал'].map(a=>a.replace(/cal|кал/, lat+'$&'))
    )
  );
});

export default energy;
