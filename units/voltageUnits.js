/* voltageUnits.js — напряжение (1 В = 1 m²·kg·s⁻³·A⁻¹) */
import { makeUnit } from './_factory.js';

export default [
  /* базовая единица ----------------------------------------------------- */
  makeUnit(
    { en:'volt',        ru:'вольт',        es:'voltio',           de:'Volt',
      fr:'volt',        zh:'伏',           pt:'volt',            ar:'فولت',
      hi:'वोल्ट',        ja:'ボルト' },
    { en:'V',           ru:'В',            es:'V',               de:'V',
      fr:'V',           zh:'V',            pt:'V',               ar:'V',
      hi:'V',           ja:'V' },
    1,
    ['v','вольт','volt']
  ),

  /* десятичные доли ----------------------------------------------------- */
  makeUnit(
    { en:'millivolt',   ru:'милливольт',   es:'milivoltio',      de:'Millivolt',
      fr:'millivolt',   zh:'毫伏',         pt:'milivolt',        ar:'ميليفولت',
      hi:'मिलीवोल्ट',    ja:'ミリボルト' },
    { en:'mV',          ru:'мВ',           es:'mV',              de:'mV',
      fr:'mV',          zh:'mV',           pt:'mV',              ar:'mV',
      hi:'mV',          ja:'mV' },
    1e-3,
    ['mv','мв']
  ),

  makeUnit(
    { en:'microvolt',   ru:'микровольт',   es:'microvoltio',     de:'Mikrovolt',
      fr:'microvolt',   zh:'微伏',         pt:'microvolt',       ar:'ميكروفولت',
      hi:'माइक्रोवोल्ट', ja:'マイクロボルト' },
    { en:'µV',          ru:'мкВ',          es:'µV',              de:'µV',
      fr:'µV',          zh:'µV',           pt:'µV',              ar:'µV',
      hi:'µV',          ja:'µV' },
    1e-6,
    ['uv','µv','мкв']
  ),

  /* десятичные кратные -------------------------------------------------- */
  makeUnit(
    { en:'kilovolt',    ru:'киловольт',    es:'kilovoltio',      de:'Kilovolt',
      fr:'kilovolt',    zh:'千伏',         pt:'quilovolt',       ar:'كيلوفولت',
      hi:'किलोवोल्ट',    ja:'キロボルト' },
    { en:'kV',          ru:'кВ',           es:'kV',              de:'kV',
      fr:'kV',          zh:'kV',           pt:'kV',              ar:'kV',
      hi:'kV',          ja:'kV' },
    1e3,
    ['kv','кв']
  ),

  makeUnit(
    { en:'megavolt',    ru:'мегавольт',    es:'megavoltio',      de:'Megavolt',
      fr:'mégavolt',    zh:'兆伏',         pt:'megavolt',        ar:'ميغافولت',
      hi:'मेगावोल्ट',    ja:'メガボルト' },
    { en:'MV',          ru:'МВ',           es:'MV',              de:'MV',
      fr:'MV',          zh:'MV',           pt:'MV',              ar:'MV',
      hi:'MV',          ja:'MV' },
    1e6,
    ['mv','мв','megavolt']
  ),

  makeUnit(
    { en:'gigavolt',    ru:'гигавольт',    es:'gigavoltio',      de:'Gigavolt',
      fr:'gigavolt',    zh:'吉伏',         pt:'gigavolt',        ar:'غيغافولت',
      hi:'गीगावोल्ट',    ja:'ギガボルト' },
    { en:'GV',          ru:'ГВ',           es:'GV',              de:'GV',
      fr:'GV',          zh:'GV',           pt:'GV',              ar:'GV',
      hi:'GV',          ja:'GV' },
    1e9,
    ['gv','гв']
  ),

  /* CGS единица --------------------------------------------------------- */
  makeUnit(
    { en:'statvolt',    ru:'статвольт',    es:'estátvoltio',     de:'Statvolt',
      fr:'statvolt',    zh:'静电伏',        pt:'estatvolt',       ar:'ستاتفولت',
      hi:'स्टैटवोल्ट',   ja:'スタットボルト' },
    { en:'statV',       ru:'статВ',        es:'statV',           de:'statV',
      fr:'statV',       zh:'statV',        pt:'statV',           ar:'statV',
      hi:'statV',       ja:'statV' },
    1e-8,                // 1 statV ≈ 1 × 10⁻⁸ V
    ['statv','статв']
  )
];
