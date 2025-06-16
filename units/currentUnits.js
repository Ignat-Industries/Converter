/* currentUnits.js — электрический ток (А) */
import { makeUnit } from './_factory.js';

const currentUnits = [
    /* секунда (база) ------------------------------------------------------- */
    makeUnit(
    { en:'ampere', ru:'ампер', es:'amperio', de:'Ampere', fr:'ampère',
      zh:'安培', pt:'ampere', ar:'أمبير', hi:'ऐम्पियर', ja:'アンペア' },
    { en:'A', ru:'А', es:'A', de:'A', fr:'A', zh:'A', pt:'A',
      ar:'A', hi:'A', ja:'A' },
    1, ['a','amp','ампер']
  ),

  makeUnit( /* milli- */
    { en:'milliampere', ru:'миллиампер', es:'miliamperio', de:'Milliampere', fr:'milliampère',
      zh:'毫安培', pt:'miliampere', ar:'ملي أمبير', hi:'मिलीऐम्पियर', ja:'ミリアンペア' },
    { en:'mA', ru:'мА', es:'mA', de:'mA', fr:'mA', zh:'mA', pt:'mA',
      ar:'mA', hi:'mA', ja:'mA' },
    1e-3
  ),

  makeUnit( /* micro- */
    { en:'microampere', ru:'микроампер', es:'microamperio', de:'Mikroampere', fr:'microampère',
      zh:'微安培', pt:'microampere', ar:'ميكرو أمبير', hi:'माइक्रोऐम्पियर', ja:'マイクロアンペア' },
    { en:'µA', ru:'мкА', es:'µA', de:'µA', fr:'µA', zh:'µA', pt:'µA',
      ar:'µA', hi:'µA', ja:'µA' },
    1e-6, ['uA','µA','мкА']
  ),

  makeUnit( /* nano- */
    { en:'nanoampere', ru:'наноампер', es:'nanoamperio', de:'Nanoampere', fr:'nanoampère',
      zh:'纳安培', pt:'nanoampere', ar:'نانو أمبير', hi:'नैनोऐम्पियर', ja:'ナノアンペア' },
    { en:'nA', ru:'нА', es:'nA', de:'nA', fr:'nA', zh:'nA', pt:'nA',
      ar:'nA', hi:'nA', ja:'nA' },
    1e-9
  ),

  makeUnit( /* kilo- */
    { en:'kiloampere', ru:'килоампер', es:'kiloamperio', de:'Kiloampere', fr:'kiloampère',
      zh:'千安培', pt:'kiloampere', ar:'كيلو أمبير', hi:'किलोऐम्पियर', ja:'キロアンペア' },
    { en:'kA', ru:'кА', es:'kA', de:'kA', fr:'kA', zh:'kA', pt:'kA',
      ar:'kA', hi:'kA', ja:'kA' },
    1e3
  ),

  makeUnit( /* mega- */
    { en:'megaampere', ru:'мегаампер', es:'megaamperio', de:'Megaampere', fr:'méga-ampère',
      zh:'兆安培', pt:'megaampere', ar:'ميجا أمبير', hi:'मेगाऐम्पियर', ja:'メガアンペア' },
    { en:'MA', ru:'МА', es:'MA', de:'MA', fr:'MA', zh:'MA', pt:'MA',
      ar:'MA', hi:'MA', ja:'MA' },
    1e6
  ),

  makeUnit( /* femto- */
    { en:'femtoampere', ru:'фемтоампер', es:'femtoamperio', de:'Femtoampere', fr:'femto-ampère',
      zh:'飞安培', pt:'femtoampere', ar:'فمتو أمبير', hi:'फेम्टोऐम्पियर', ja:'フェムトアンペア' },
    { en:'fA', ru:'фА', es:'fA', de:'fA', fr:'fA', zh:'fA', pt:'fA',
      ar:'fA', hi:'fA', ja:'fA' },
    1e-15
  ),

  makeUnit( /* atto- */
    { en:'attoampere', ru:'аттоампер', es:'attoamperio', de:'Attoampere', fr:'atto-ampère',
      zh:'阿托安培', pt:'attoampere', ar:'أتو أمبير', hi:'अट्टोऐम्पियर', ja:'アトアンペア' },
    { en:'aA', ru:'аА', es:'aA', de:'aA', fr:'aA', zh:'aA', pt:'aA',
      ar:'aA', hi:'aA', ja:'aA' },
    1e-18
  ),

  makeUnit( /* statampere (CGS-ESU) */
    { en:'statampere', ru:'статампер', es:'estatamperio', de:'Statampere', fr:'statampère',
      zh:'静电安培', pt:'estatampere', ar:'ستات أمبير', hi:'स्टैटऐम्पियर', ja:'スタットアンペア' },
    { en:'statA', ru:'стА', es:'statA', de:'statA', fr:'statA', zh:'statA',
      pt:'statA', ar:'statA', hi:'statA', ja:'statA' },
    3.33564e-10
  ),

  makeUnit( /* abampere (CGS-EMU) */
    { en:'abampere', ru:'абампер', es:'abamperio', de:'Abampere', fr:'abampère',
      zh:'安培(绝对)', pt:'abampere', ar:'أب أمبير', hi:'अबऐम्पियर', ja:'アブアンペア' },
    { en:'abA', ru:'абА', es:'abA', de:'abA', fr:'abA', zh:'abA',
      pt:'abA', ar:'abA', hi:'abA', ja:'abA' },
    1.11265e-12
  )
];

export default currentUnits
