// lengthUnits.js
// -----------------------------------------------------------------------------
//  Все единицы длины в одном месте.             ©2025 Ignat-Industries
// -----------------------------------------------------------------------------

import { makeUnit } from './_factory.js';

/**
 * Экспортируем массив lengthUnits,
 * который потом будем импортировать в unitsData.js
 * --------------------------------------------------------------------------- */
const lengthUnits = [
  /* базовая единица --------------------------------------------------------- */
  makeUnit(
    { en:'meter',         ru:'метр',          es:'metro',         de:'Meter',
      fr:'mètre',         zh:'米',            pt:'metro',         ar:'متر',
      hi:'मीटर',         ja:'メートル' },
    { en:'m',  ru:'м',  es:'m',  de:'m',  fr:'m',  zh:'m',  pt:'m',  ar:'م',
      hi:'m',  ja:'m' },
    1, ['m','метр','м']
  ),

  /* --- десятичные КРАТНЫЕ -------------------------------------------------- */
  makeUnit(
    { en:'decameter',     ru:'декаметр',      es:'decámetro',     de:'Dekameter',
      fr:'décamètre',     zh:'十米',          pt:'decâmetro',     ar:'عشر أمتار',
      hi:'डेका मीटर',    ja:'デカメートル' },
    { en:'dam', ru:'дам', es:'dam', de:'dam', fr:'dam', zh:'dam', pt:'dam',
      ar:'dam', hi:'dam', ja:'dam' },
    1e1, ['dam','дам']
  ),
  makeUnit(
    { en:'hectometer',    ru:'гектометр',     es:'hectómetro',    de:'Hektometer',
      fr:'hectomètre',    zh:'百米',          pt:'hectômetro',    ar:'هكتومتر',
      hi:'हेक्टोमीटर',   ja:'ヘクトメートル' },
    { en:'hm',  ru:'гм',  es:'hm',  de:'hm',  fr:'hm',  zh:'hm',  pt:'hm',
      ar:'hm',  hi:'hm',  ja:'hm' },
    1e2, ['hm','гм']
  ),
  makeUnit( /* kilometer уже был, но нужен в общем списке */
    { en:'kilometer',     ru:'километр',      es:'kilómetro',     de:'Kilometer',
      fr:'kilomètre',     zh:'千米',          pt:'quilômetro',    ar:'كيلومتر',
      hi:'किलोमीटर',     ja:'キロメートル' },
    { en:'km',  ru:'км',  es:'km',  de:'km',  fr:'km',  zh:'km',  pt:'km',
      ar:'كم',  hi:'km',  ja:'km' },
    1e3, ['km','км']
  ),
  makeUnit(
    { en:'megameter',     ru:'мегаметр',      es:'megametro',     de:'Megameter',
      fr:'mégamètre',     zh:'兆米',          pt:'megametro',     ar:'ميجامتر',
      hi:'मेगामीटर',     ja:'メガメートル' },
    { en:'Mm',  ru:'Мм',  es:'Mm',  de:'Mm',  fr:'Mm',  zh:'Mm',  pt:'Mm',
      ar:'Mm',  hi:'Mm',  ja:'Mm' },
    1e6, ['Mm','Мм']
  ),
  makeUnit(
    { en:'gigameter',     ru:'гигаметр',      es:'gigámetro',     de:'Gigameter',
      fr:'gégamètre',     zh:'吉米',          pt:'gigâmetro',     ar:'جيجامتر',
      hi:'गिगामीटर',     ja:'ギガメートル' },
    { en:'Gm',  ru:'Гм',  es:'Gm',  de:'Gm',  fr:'Gm',  zh:'Gm',  pt:'Gm',
      ar:'Gm',  hi:'Gm',  ja:'Gm' },
    1e9, ['Gm','Гм']
  ),
  makeUnit(
    { en:'terameter',     ru:'тераметр',      es:'terámetro',     de:'Terameter',
      fr:'téramètre',     zh:'太米',          pt:'terâmetro',     ar:'تيرامتر',
      hi:'टेरा मीटर',    ja:'テラメートル' },
    { en:'Tm',  ru:'Тм',  es:'Tm',  de:'Tm',  fr:'Tm',  zh:'Tm',  pt:'Tm',
      ar:'Tm',  hi:'Tm',  ja:'Tm' },
    1e12, ['Tm','Тм']
  ),
  makeUnit(
    { en:'petameter',     ru:'петаметр',      es:'petámetro',     de:'Petameter',
      fr:'pétamètre',     zh:'拍米',          pt:'petâmetro',     ar:'بيتامتر',
      hi:'पेटा मीटर',    ja:'ペタメートル' },
    { en:'Pm',  ru:'Пм',  es:'Pm',  de:'Pm',  fr:'Pm',  zh:'Pm',  pt:'Pm',
      ar:'Pm',  hi:'Pm',  ja:'Pm' },
    1e15, ['Pm','Пм']
  ),
  makeUnit(
    { en:'exameter',      ru:'эксаметр',      es:'exámetro',      de:'Exameter',
      fr:'examètre',      zh:'艾米',          pt:'exâmetro',      ar:'إكسامتر',
      hi:'एग्जा मीटर',   ja:'エクサメートル' },
    { en:'Em',  ru:'Эм',  es:'Em',  de:'Em',  fr:'Em',  zh:'Em',  pt:'Em',
      ar:'Em',  hi:'Em',  ja:'Em' },
    1e18, ['Em','Эм']
  ),
  makeUnit(
    { en:'zettameter',    ru:'зеттаметр',     es:'zettámetro',    de:'Zettameter',
      fr:'zettamètre',    zh:'泽米',          pt:'zettâmetro',    ar:'زيتامتر',
      hi:'ज़ेटा मीटर',   ja:'ゼッタメートル' },
    { en:'Zm',  ru:'Зм',  es:'Zm',  de:'Zm',  fr:'Zm',  zh:'Zm',  pt:'Zm',
      ar:'Zm',  hi:'Zm',  ja:'Zm' },
    1e21, ['Zm','Зм']
  ),
  makeUnit(
    { en:'yottameter',    ru:'йоттаметр',     es:'yottámetro',    de:'Yottameter',
      fr:'yottamètre',    zh:'尧米',          pt:'yottâmetro',    ar:'يوتامتر',
      hi:'योत्ता मीटर',  ja:'ヨッタメートル' },
    { en:'Ym',  ru:'Им',  es:'Ym',  de:'Ym',  fr:'Ym',  zh:'Ym',  pt:'Ym',
      ar:'Ym',  hi:'Ym',  ja:'Ym' },
    1e24, ['Ym','Им']
  ),
  makeUnit(
    { en:'ronnameter',    ru:'роннаметр',     es:'ronnómetro',    de:'Ronnameter',
      fr:'ronnamètre',    zh:'罗米',          pt:'ronnâmetro',    ar:'رونامتر',
      hi:'रॉना मीटर',    ja:'ロナメートル' },
    { en:'Rm',  ru:'Рнм', es:'Rm',  de:'Rm',  fr:'Rm',  zh:'Rm',  pt:'Rm',
      ar:'Rm',  hi:'Rm',  ja:'Rm' },
    1e27, ['Rm','рнм']
  ),
  makeUnit(
    { en:'quettameter',   ru:'кветтаметр',    es:'quettámetro',   de:'Quettameter',
      fr:'quettamètre',   zh:'奎米',          pt:'quettâmetro',   ar:'كويتامتر',
      hi:'क्वेटा मीटर',  ja:'クエタメートル' },
    { en:'Qm',  ru:'Квм', es:'Qm',  de:'Qm',  fr:'Qm',  zh:'Qm',  pt:'Qm',
      ar:'Qm',  hi:'Qm',  ja:'Qm' },
    1e30, ['Qm','квм']
  ),

  /* --- десятичные ДОЛИ ---------------------------------------------------- */
  makeUnit(
    { en:'decimeter',     ru:'дециметр',      es:'decímetro',     de:'Dezimeter',
      fr:'décimètre',     zh:'分米',          pt:'decímetro',     ar:'ديسيمتر',
      hi:'डेसिमीटर',    ja:'デシメートル' },
    { en:'dm',  ru:'дм',  es:'dm',  de:'dm',  fr:'dm',  zh:'dm',  pt:'dm',
      ar:'dm',  hi:'dm',  ja:'dm' },
    1e-1, ['dm','дм']
  ),
  makeUnit(
    { en:'centimeter',    ru:'сантиметр',     es:'centímetro',    de:'Zentimeter',
      fr:'centimètre',    zh:'厘米',          pt:'centímetro',    ar:'سنتيمتر',
      hi:'सेंटीमीटर',   ja:'センチメートル' },
    { en:'cm',  ru:'см',  es:'cm',  de:'cm',  fr:'cm',  zh:'cm',  pt:'cm',
      ar:'cm',  hi:'cm',  ja:'cm' },
    1e-2, ['cm','см']
  ),
  makeUnit(
    { en:'millimeter',    ru:'миллиметр',     es:'milímetro',     de:'Millimeter',
      fr:'millimètre',    zh:'毫米',          pt:'milímetro',     ar:'ملليمتر',
      hi:'मिलीमीटर',    ja:'ミリメートル' },
    { en:'mm',  ru:'мм',  es:'mm',  de:'mm',  fr:'mm',  zh:'mm',  pt:'mm',
      ar:'mm',  hi:'mm',  ja:'mm' },
    1e-3, ['mm','мм']
  ),
  makeUnit(
    { en:'micrometer',    ru:'микрометр',     es:'micrómetro',    de:'Mikrometer',
      fr:'micromètre',    zh:'微米',          pt:'micrômetro',    ar:'ميكرومتر',
      hi:'माइक्रोमीटर', ja:'マイクロメートル' },
    { en:'µm', ru:'мкм', es:'µm', de:'µm', fr:'µm', zh:'µm', pt:'µm',
      ar:'µm', hi:'µm', ja:'µm' },
    1e-6, ['um','µm','мкм']
  ),
  makeUnit(
    { en:'nanometer',     ru:'нанометр',      es:'nanómetro',     de:'Nanometer',
      fr:'nanomètre',     zh:'纳米',          pt:'nanômetro',     ar:'نانومتر',
      hi:'नैनोमीटर',    ja:'ナノメートル' },
    { en:'nm',  ru:'нм',  es:'nm',  de:'nm',  fr:'nm',  zh:'nm',  pt:'nm',
      ar:'nm',  hi:'nm',  ja:'nm' },
    1e-9, ['nm','нм']
  ),
  makeUnit(
    { en:'picometer',     ru:'пикометр',      es:'picómetro',     de:'Pikometer',
      fr:'picomètre',     zh:'皮米',          pt:'picômetro',     ar:'بيكومتر',
      hi:'पिकोमीटर',    ja:'ピコメートル' },
    { en:'pm',  ru:'пм',  es:'pm',  de:'pm',  fr:'pm',  zh:'pm',  pt:'pm',
      ar:'pm',  hi:'pm',  ja:'pm' },
    1e-12, ['pm','пм']
  ),
  makeUnit(
    { en:'femtometer',    ru:'фемтометр',     es:'femtómetro',    de:'Femtometer',
      fr:'femtomètre',    zh:'飞米',          pt:'femtômetro',    ar:'فمتومتر',
      hi:'फेम्टोमीटर',   ja:'フェムトメートル' },
    { en:'fm',  ru:'фм',  es:'fm',  de:'fm',  fr:'fm',  zh:'fm',  pt:'fm',
      ar:'fm',  hi:'fm',  ja:'fm' },
    1e-15, ['fm','фм']
  ),
  makeUnit(
    { en:'attometer',     ru:'аттометр',      es:'attómetro',     de:'Attometer',
      fr:'attomètre',     zh:'阿米',          pt:'attômetro',     ar:'أتومتر',
      hi:'एट्टोमीटर',   ja:'アットメートル' },
    { en:'am',  ru:'ам',  es:'am',  de:'am',  fr:'am',  zh:'am',  pt:'am',
      ar:'am',  hi:'am',  ja:'am' },
    1e-18, ['am','ам']
  ),
  makeUnit(
    { en:'zeptometer',    ru:'зептометр',     es:'zeptómetro',    de:'Zeptometer',
      fr:'zeptomètre',    zh:'介米',          pt:'zeptômetro',    ar:'زپтомتر',
      hi:'ज़ेप्टोमीटर', ja:'ゼプトメートル' },
    { en:'zm',  ru:'зм',  es:'zm',  de:'zm',  fr:'zm',  zh:'zm',  pt:'zm',
      ar:'zm',  hi:'zm',  ja:'zm' },
    1e-21, ['zm','зм']
  ),
  makeUnit(
    { en:'yoctometer',    ru:'иоктометр',     es:'yoctómetro',    de:'Yoctometer',
      fr:'yoctomètre',    zh:'幺米',          pt:'yoctômetro',    ar:'يوكتومتر',
      hi:'योक्तोमीटर',  ja:'ヨクトメートル' },
    { en:'ym',  ru:'им',  es:'ym',  de:'ym',  fr:'ym',  zh:'ym',  pt:'ym',
      ar:'ym',  hi:'ym',  ja:'ym' },
    1e-24, ['ym','им']
  ),
  makeUnit(
    { en:'rontometer',    ru:'ронтометр',     es:'rontómetro',    de:'Rontometer',
      fr:'rontomètre',    zh:'容米',          pt:'rontômetro',    ar:'رونتومتر',
      hi:'रॉन्तोमीटर',  ja:'ロントメートル' },
    { en:'rm',  ru:'рнм', es:'rm',  de:'rm',  fr:'rm',  zh:'rm',  pt:'rm',
      ar:'rm',  hi:'rm',  ja:'rm' },
    1e-27, ['rm','рнм']
  ),
  makeUnit(
    { en:'quectometer',   ru:'квектометр',    es:'quectómetro',   de:'Quectometer',
      fr:'quectomètre',   zh:'端米',          pt:'quectômetro',   ar:'كويكتومتر',
      hi:'क्वेक्टोमीटर', ja:'クエクトメートル' },
    { en:'qm',  ru:'квм', es:'qm',  de:'qm',  fr:'qm',  zh:'qm',  pt:'qm',
      ar:'qm',  hi:'qm',  ja:'qm' },
    1e-30, ['qm','квм']
  ),

  /* --- традиционные (дюйм, фут, ярд, миля) ------------------------------- */
  makeUnit(
    { en:'inch',          ru:'дюйм',          es:'pulgada',       de:'Zoll',
      fr:'pouce',         zh:'英寸',          pt:'polegada',      ar:'بوصة',
      hi:'इंच',          ja:'インチ' },
    { en:'in',  ru:'дюйм', es:'in', de:'in', fr:'in', zh:'in', pt:'in',
      ar:'in', hi:'in', ja:'in' },
    0.0254, ['in','inch','дюйм']
  ),
  makeUnit(
    { en:'foot',          ru:'фут',           es:'pie',           de:'Fuß',
      fr:'pied',          zh:'英尺',          pt:'pé',            ar:'قدم',
      hi:'फुट',          ja:'フィート' },
    { en:'ft',  ru:'фт',  es:'ft',  de:'ft',  fr:'ft',  zh:'ft',  pt:'ft',
      ar:'ft',  hi:'ft',  ja:'ft' },
    0.3048, ['ft','foot','фут']
  ),
  makeUnit(
    { en:'yard',          ru:'ярд',           es:'yarda',         de:'Yard',
      fr:'yard',          zh:'码',            pt:'jarda',         ar:'ياردة',
      hi:'गज',           ja:'ヤード' },
    { en:'yd',  ru:'ярд', es:'yd', de:'yd', fr:'yd', zh:'yd', pt:'yd',
      ar:'yd', hi:'yd', ja:'yd' },
    0.9144, ['yd','yard','ярд']
  ),
  makeUnit(
    { en:'mile',          ru:'миля',          es:'milla',         de:'Meile',
      fr:'mille',         zh:'英里',          pt:'milha',         ar:'ميل',
      hi:'मील',          ja:'マイル' },
    { en:'mi',  ru:'миля', es:'mi', de:'mi', fr:'mi', zh:'mi', pt:'mi',
      ar:'mi', hi:'mi', ja:'mi' },
    1609.344, ['mi','mile','миля']
  )
];

export default lengthUnits;
