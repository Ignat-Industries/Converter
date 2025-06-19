/* resistanceUnits.js */
import { makeUnit } from './factory.js';

const resistanceUnits = [
    /* секунда (база) ------------------------------------------------------- */
    makeUnit(
    { en:'ohm',       ru:'ом',        es:'ohmio',      de:'Ohm',        fr:'ohm',
      zh:'欧姆',       pt:'ohm',       ar:'أوم',        hi:'ओम',         ja:'オーム' },
    { en:'Ω',         ru:'Ω',         es:'Ω',          de:'Ω',          fr:'Ω',
      zh:'Ω',          pt:'Ω',         ar:'Ω',          hi:'Ω',          ja:'Ω' },
    1, ['ohm','ω','ом','Ω']
  ),

  /* десятичные кратные / доли */
  makeUnit( /* mΩ */
    { en:'milliohm',  ru:'миллиом',   es:'miliohmio',  de:'Milliohm',   fr:'milliohm',
      zh:'毫欧',       pt:'milliohm',  ar:'ميلي أوم',   hi:'मिलीओम',     ja:'ミリオーム' },
    { en:'mΩ',        ru:'мΩ',        es:'mΩ',         de:'mΩ',         fr:'mΩ',
      zh:'mΩ',         pt:'mΩ',        ar:'mΩ',         hi:'mΩ',         ja:'mΩ' },
    1e-3, ['mohm','mΩ','мΩ']
  ),
  makeUnit( /* µΩ */
    { en:'microohm',  ru:'микроом',   es:'microohmio', de:'Mikroohm',   fr:'microohm',
      zh:'微欧',       pt:'microohm',  ar:'ميكرو أوم',  hi:'माइक्रोओम',   ja:'マイクロオーム' },
    { en:'µΩ',        ru:'мкΩ',       es:'µΩ',         de:'µΩ',         fr:'µΩ',
      zh:'µΩ',         pt:'µΩ',        ar:'µΩ',         hi:'µΩ',         ja:'µΩ' },
    1e-6, ['uohm','µΩ','мкΩ','microohm']
  ),
  makeUnit( /* kΩ */
    { en:'kiloohm',   ru:'килоом',    es:'kiloohmio',  de:'Kiloohm',    fr:'kiloohm',
      zh:'千欧',       pt:'kiloohm',   ar:'كيلو أوم',   hi:'किलोओम',     ja:'キロオーム' },
    { en:'kΩ',        ru:'кΩ',        es:'kΩ',         de:'kΩ',         fr:'kΩ',
      zh:'kΩ',         pt:'kΩ',        ar:'kΩ',         hi:'kΩ',         ja:'kΩ' },
    1e3, ['kohm','kΩ','кΩ']
  ),
  makeUnit( /* MΩ */
    { en:'megaohm',   ru:'мегаом',    es:'megaohmio',  de:'Megaohm',    fr:'mégaohm',
      zh:'兆欧',       pt:'megaohm',   ar:'ميغا أوم',   hi:'मेगा ओम',     ja:'メガオーム' },
    { en:'MΩ',        ru:'МΩ',        es:'MΩ',         de:'MΩ',         fr:'MΩ',
      zh:'MΩ',         pt:'MΩ',        ar:'MΩ',         hi:'MΩ',         ja:'MΩ' },
    1e6, ['Mohm','MΩ','МΩ']
  ),
  makeUnit( /* GΩ */
    { en:'gigaohm',   ru:'гигаом',    es:'gigaohmio',  de:'Gigaohm',    fr:'gigaohm',
      zh:'吉欧',       pt:'gigaohm',   ar:'غيغا أوم',   hi:'गीगा ओम',     ja:'ギガオーム' },
    { en:'GΩ',        ru:'ГΩ',        es:'GΩ',         de:'GΩ',         fr:'GΩ',
      zh:'GΩ',         pt:'GΩ',        ar:'GΩ',         hi:'GΩ',         ja:'GΩ' },
    1e9, ['Gohm','GΩ','ГΩ']
  ),

  /* системы CGS */
  makeUnit( /* statΩ ≈ 1.129 Ω */
    { en:'statohm',   ru:'статом',    es:'estatoohmio',de:'Statohm',    fr:'statoohm',
      zh:'静欧',       pt:'estatohm',  ar:'ستات أوم',   hi:'स्टैटओम',     ja:'スタットオーム' },
    { en:'statΩ',     ru:'статΩ',     es:'statΩ',      de:'statΩ',      fr:'statΩ',
      zh:'statΩ',      pt:'statΩ',     ar:'statΩ',      hi:'statΩ',      ja:'statΩ' },
    1.129, ['statΩ','статом','statohm']
  ),
  makeUnit( /* abΩ ≈ 1.129 × 10⁻⁹ Ω */
    { en:'abohm',     ru:'абом',      es:'aboohmio',   de:'Abohm',      fr:'abohm',
      zh:'阿欧',       pt:'abohm',     ar:'أب أوم',      hi:'एबओम',       ja:'アブオーム' },
    { en:'abΩ',       ru:'абΩ',       es:'abΩ',        de:'abΩ',        fr:'abΩ',
      zh:'abΩ',        pt:'abΩ',       ar:'abΩ',        hi:'abΩ',        ja:'abΩ' },
    1.129e-9, ['abΩ','абом','abohm']
  )
];

export default resistanceUnits
