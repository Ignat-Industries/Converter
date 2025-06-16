/* conductanceUnits.js — электрическая проводимость (См) */
import { makeUnit } from './_factory.js';

const conductanceUnits = [
    /* секунда (база) ------------------------------------------------------- */
    makeUnit(
    { en:'siemens', ru:'сименс', es:'siemens', de:'Siemens', fr:'siemens',
      zh:'西门子', pt:'siemens', ar:'سيمنز', hi:'साइमेंस', ja:'ジーメンス' },
    { en:'S', ru:'См', es:'S', de:'S', fr:'S', zh:'S', pt:'S',
      ar:'S', hi:'S', ja:'S' },
    1, ['s','см','siemens']
  ),

  makeUnit(
    { en:'millisiemens', ru:'миллисименс', es:'millisiemens', de:'Millisiemens', fr:'millisiemens',
      zh:'毫西门子', pt:'millisiemens', ar:'ملي سيمنز', hi:'मिलीसाइमेंस', ja:'ミリジーメンス' },
    { en:'mS', ru:'мСм', es:'mS', de:'mS', fr:'mS', zh:'mS', pt:'mS',
      ar:'mS', hi:'mS', ja:'mS' },
    1e-3
  ),

  makeUnit(
    { en:'microsiemens', ru:'микросименс', es:'microsiemens', de:'Mikrosiemens', fr:'microsiemens',
      zh:'微西门子', pt:'microsiemens', ar:'ميكرو سيمنز', hi:'माइक्रोसाइमेंस', ja:'マイクロジーメンス' },
    { en:'µS', ru:'мкСм', es:'µS', de:'µS', fr:'µS', zh:'µS', pt:'µS',
      ar:'µS', hi:'µS', ja:'µS' },
    1e-6, ['uS','µS','мкСм']
  ),

  makeUnit(
    { en:'kilosiemens', ru:'килосименс', es:'kilosiemens', de:'Kilosiemens', fr:'kilosiemens',
      zh:'千西门子', pt:'kilosiemens', ar:'كيلو سيمنز', hi:'किलोसाइमेंस', ja:'キロジーメンス' },
    { en:'kS', ru:'кСм', es:'kS', de:'kS', fr:'kS', zh:'kS', pt:'kS',
      ar:'kS', hi:'kS', ja:'kS' },
    1e3
  ),

  makeUnit(
    { en:'megasiemens', ru:'мегасименс', es:'megasiemens', de:'Megasiemens', fr:'mégasiemens',
      zh:'兆西门子', pt:'megasiemens', ar:'ميجا سيمنز', hi:'मेगासाइमेंस', ja:'メガジーメンス' },
    { en:'MS', ru:'МСм', es:'MS', de:'MS', fr:'MS', zh:'MS', pt:'MS',
      ar:'MS', hi:'MS', ja:'MS' },
    1e6
  )
];

export default conductanceUnits