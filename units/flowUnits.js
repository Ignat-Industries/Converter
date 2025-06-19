/* flowUnits.js  — объёмная скорость (м³/с) */
import { makeUnit } from './factory.js';

/**
 * Порядок языков в объектах names / symbol:
 * en, ru, es, de, fr, zh, pt, ar, hi, ja
 */
const flowUnits = [
  /* ───── базовая ──────────────── */
  makeUnit(
    { en:'cubic metre per second', ru:'кубический метр в секунду',
      es:'metro cúbico por segundo', de:'Kubikmeter pro Sekunde',
      fr:'mètre cube par seconde',   zh:'立方米每秒',         pt:'metro cúbico por segundo',
      ar:'متر مكعب/ثانية',          hi:'घन मीटर/सेकंड',    ja:'立方メートル毎秒' },
    { en:'m³/s', ru:'м³/с', es:'m³/s', de:'m³/s', fr:'m³/s',
      zh:'m³/s', pt:'m³/s', ar:'م³/ث', hi:'m³/स', ja:'m³/s' },
    1,
    ['m3/s','м3/с','m³/s','м³/с']
  ),

  /* US gallon / minute (GPM) */
  makeUnit(
    { en:'US gallon per minute', ru:'галлон (США) в минуту',
      es:'galón EE. UU. por minuto', de:'US-Gallone pro Minute',
      fr:'gallon US par minute', zh:'美制加仑/分', pt:'galão (EUA) por minuto',
      ar:'غالون أمريكي/دقيقة', hi:'यूएस गैलन/मिनट', ja:'米ガロン毎分' },
    { en:'GPM (US)', ru:'гал/мин (США)', es:'GPM (US)', de:'GPM (US)',
      fr:'GPM (US)', zh:'GPM', pt:'GPM (US)', ar:'GPM', hi:'GPM', ja:'GPM' },
    6.309e-5,
    ['gpm','gpmus','gal/min(us)','гал/мин','гал/мин (США)']
  ),

  /* US gallon / second (GPS) */
  makeUnit(
    { en:'US gallon per second', ru:'галлон (США) в секунду',
      es:'galón EE. UU. por segundo', de:'US-Gallone pro Sekunde',
      fr:'gallon US par seconde', zh:'美制加仑/秒', pt:'galão (EUA) por segundo',
      ar:'غالون أمريكي/ثانية', hi:'यूएस गैलन/सेकंड', ja:'米ガロン毎秒' },
    { en:'GPS (US)', ru:'гал/с (США)', es:'GPS (US)', de:'GPS (US)',
      fr:'GPS (US)', zh:'GPS', pt:'GPS (US)', ar:'GPS', hi:'GPS', ja:'GPS' },
    3.78541e-6,
    ['gps','gpsus','gal/s(us)','гал/с','гал/с (США)']
  ),

  /* UK gallon / minute (GPM UK) */
  makeUnit(
    { en:'UK gallon per minute', ru:'галлон (брит.) в минуту',
      es:'galón británico por minuto', de:'UK-Gallone pro Minute',
      fr:'gallon UK par minute', zh:'英制加仑/分', pt:'galão (RU) por minuto',
      ar:'غالون بريطاني/دقيقة', hi:'यूके गैलन/मिनट', ja:'英ガロン毎分' },
    { en:'GPM (UK)', ru:'гал/мин (брит.)', es:'GPM (UK)', de:'GPM (UK)',
      fr:'GPM (UK)', zh:'GPM (UK)', pt:'GPM (UK)', ar:'GPM', hi:'GPM', ja:'GPM' },
    7.576e-5,
    ['gpmuk','gal/min(uk)','гал/мин (брит.)']
  ),

  /* UK gallon / second (GPS UK) */
  makeUnit(
    { en:'UK gallon per second', ru:'галлон (брит.) в секунду',
      es:'galón británico por segundo', de:'UK-Gallone pro Sekunde',
      fr:'gallon UK par seconde', zh:'英制加仑/秒', pt:'galão (RU) por segundo',
      ar:'غالون بريطاني/ثانية', hi:'यूके गैलन/सेकंड', ja:'英ガロン毎秒' },
    { en:'GPS (UK)', ru:'гал/с (брит.)', es:'GPS (UK)', de:'GPS (UK)',
      fr:'GPS (UK)', zh:'GPS (UK)', pt:'GPS (UK)', ar:'GPS', hi:'GPS', ja:'GPS' },
    6.309e-6,
    ['gpsuk','gal/s(uk)','гал/с (брит.)']
  ),

  /* US pint / second */
  makeUnit(
    { en:'US pint per second', ru:'пинта (США) в секунду',
      es:'pinta EE. UU. por segundo', de:'US-Pint pro Sekunde',
      fr:'pinte US par seconde', zh:'美品脱/秒', pt:'pinta (EUA) por segundo',
      ar:'باينت أمريكي/ثانية', hi:'यूएस पिंट/सेकंड', ja:'米パイント毎秒' },
    { en:'pt/s (US)', ru:'пинта/с (США)', es:'pt/s (US)', de:'pt/s (US)',
      fr:'pt/s (US)', zh:'pt/s', pt:'pt/s (US)', ar:'pt/s', hi:'pt/s', ja:'pt/s' },
    2.95735e-5,
    ['pt/s','pt/sus','pint/s','пинта/с']
  ),

  /* MSCFD — 1 000 scf/d */
  makeUnit(
    { en:'MSCFD (thousand scf / day)', ru:'тскф/сут',
      es:'MPCFD (mil pies³/día)', de:'MSCFD', fr:'MSCFD',
      zh:'千标方/日', pt:'MSCFD', ar:'MSCFD', hi:'MSCFD', ja:'MSCFD' },
    { en:'MSCFD', ru:'тскф/сут', es:'MSCFD', de:'MSCFD', fr:'MSCFD',
      zh:'MSCFD', pt:'MSCFD', ar:'MSCFD', hi:'MSCFD', ja:'MSCFD' },
    3.27741e-4,
    ['mscfd','mkscf/d','тскф/сут']
  ),

  /* MMSCFD — 1 000 MSCFD */
  makeUnit(
    { en:'MMSCFD (million scf / day)', ru:'мскф/сут',
      es:'MMSCFD (millón pies³/día)', de:'MMSCFD', fr:'MMSCFD',
      zh:'百万标方/日', pt:'MMSCFD', ar:'MMSCFD', hi:'MMSCFD', ja:'MMSCFD' },
    { en:'MMSCFD', ru:'мскф/сут', es:'MMSCFD', de:'MMSCFD', fr:'MMSCFD',
      zh:'MMSCFD', pt:'MMSCFD', ar:'MMSCFD', hi:'MMSCFD', ja:'MMSCFD' },
    3.27741e-1,
    ['mmscfd']
  ),

  /* SCFM — standard cu ft / min */
  makeUnit(
    { en:'standard cubic foot per minute', ru:'стандартный куб. фут в минуту',
      es:'pie³ estándar por minuto', de:'Standard-Kubikfuß pro Minute',
      fr:'pied³ standard par minute', zh:'标方英尺/分', pt:'pé³ padrão por minuto',
      ar:'قدم³ قياسي/دقيقة', hi:'मानक क्यूबिक फुट/मिन', ja:'標準立方フィート毎分' },
    { en:'SCFM', ru:'скф/мин', es:'SCFM', de:'SCFM', fr:'SCFM',
      zh:'SCFM', pt:'SCFM', ar:'SCFM', hi:'SCFM', ja:'SCFM' },
    4.71947e-4,
    ['scfm']
  ),

  /* ACFM — actual cu ft / min */
  makeUnit(
    { en:'actual cubic foot per minute', ru:'фактический куб. фут в минуту',
      es:'pie³ real por minuto', de:'Tatsächlicher Kubikfuß pro Minute',
      fr:'pied³ réel par minute', zh:'实标英尺/分', pt:'pé³ real por minuto',
      ar:'قدم³ فعلي/دقيقة', hi:'वास्तविक क्यूबिक फुट/मिन', ja:'実立方フィート毎分' },
    { en:'ACFM', ru:'фкф/мин', es:'ACFM', de:'ACFM', fr:'ACFM',
      zh:'ACFM', pt:'ACFM', ar:'ACFM', hi:'ACFM', ja:'ACFM' },
    4.719e-4,
    ['acfm']
  ),

  /* SCFH — standard cu ft / hour */
  makeUnit(
    { en:'standard cubic foot per hour', ru:'стандартный куб. фут в час',
      es:'pie³ estándar por hora', de:'Standard-Kubikfuß pro Stunde',
      fr:'pied³ standard par heure', zh:'标方英尺/时', pt:'pé³ padrão por hora',
      ar:'قدم³ قياسي/ساعة', hi:'मानक क्यूबिक फुट/घंटा', ja:'標準立方フィート毎時' },
    { en:'SCFH', ru:'скф/ч', es:'SCFH', de:'SCFH', fr:'SCFH',
      zh:'SCFH', pt:'SCFH', ar:'SCFH', hi:'SCFH', ja:'SCFH' },
    7.8658e-6,
    ['scfh']
  ),

  /* BPD — barrel per day */
  makeUnit(
    { en:'barrel of oil per day', ru:'баррель нефти в сутки',
      es:'barril/día', de:'Fass pro Tag', fr:'baril par jour',
      zh:'桶/日', pt:'barril/dia', ar:'برميل/يوم', hi:'बैरल/दिन', ja:'バレル/日' },
    { en:'BPD', ru:'бар/сут', es:'BPD', de:'BPD', fr:'BPD',
      zh:'BPD', pt:'BPD', ar:'BPD', hi:'BPD', ja:'BPD' },
    1.697e-7,
    ['bpd','barrel/day','бар/сут']
  )
];

export default flowUnits;
