/* volumeUnits.js — объём (м³) */
import { makeUnit } from './_factory.js';

const volumeUnits = [
  /* кубический метр ------------------------------------------------------ */
  makeUnit(
    { en:'cubic metre', ru:'кубический метр', es:'metro cúbico',
      de:'Kubikmeter', fr:'mètre cube', zh:'立方米', pt:'metro cúbico',
      ar:'متر مكعب', hi:'घन मीटर', ja:'立方メートル' },
    { en:'m³', ru:'м³', es:'m³', de:'m³', fr:'m³',
      zh:'m³', pt:'m³', ar:'م³', hi:'m³', ja:'m³' },
    1,
    ['m3','м3','m³','м³']
  ),

  /* литр --------------------------------------------------------------- */
  makeUnit(
    { en:'litre', ru:'литр', es:'litro', de:'Liter', fr:'litre',
      zh:'升', pt:'litro', ar:'لتر', hi:'लीटर', ja:'リットル' },
    { en:'L', ru:'л', es:'L', de:'L', fr:'L', zh:'L',
      pt:'L', ar:'ل', hi:'L', ja:'L' },
    1e-3,
    ['l','л','liter','litre']
  ),

  /* US gallon ----------------------------------------------------------- */
  makeUnit(
    { en:'US gallon', ru:'галлон (США)', es:'galón (EE.UU.)',
      de:'US-Gallone', fr:'gallon US', zh:'美制加仑', pt:'galão (EUA)',
      ar:'غالون أمريكي', hi:'यूएस गैलन', ja:'米ガロン' },
    { en:'gal (US)', ru:'гал (США)', es:'gal (US)', de:'gal (US)',
      fr:'gal (US)', zh:'gal (US)', pt:'gal (US)', ar:'gal', hi:'gal', ja:'gal' },
    0.00378541,
    ['galus','usgal','gal (US)','гал (США)']
  ),

  /* UK gallon ----------------------------------------------------------- */
  makeUnit(
    { en:'UK gallon', ru:'галлон (брит.)', es:'galón (RU)',
      de:'UK-Gallone', fr:'gallon UK', zh:'英制加仑', pt:'galão (RU)',
      ar:'غالون بريطاني', hi:'यूके गैलन', ja:'英ガロン' },
    { en:'gal (UK)', ru:'гал (брит.)', es:'gal (UK)', de:'gal (UK)',
      fr:'gal (UK)', zh:'gal (UK)', pt:'gal (UK)', ar:'gal', hi:'gal', ja:'gal' },
    0.00454609,
    ['galuk','ukgal','gal (UK)','гал (брит.)']
  ),

  /* US pint ------------------------------------------------------------- */
  makeUnit(
    { en:'US pint', ru:'пинта (США)', es:'pinta (EE.UU.)',
      de:'US-Pint', fr:'pinte US', zh:'美品脱', pt:'pinta (EUA)',
      ar:'باينت أمريكي', hi:'यूएस पिंट', ja:'米パイント' },
    { en:'pt (US)', ru:'пинта (США)', es:'pt (US)', de:'pt (US)',
      fr:'pt (US)', zh:'pt (US)', pt:'pt (US)', ar:'pt', hi:'pt', ja:'pt' },
    4.73176e-4,
    ['ptus','pint','uspt','пинта (США)']
  ),

  /* UK pint ------------------------------------------------------------- */
  makeUnit(
    { en:'UK pint', ru:'пинта (брит.)', es:'pinta (RU)',
      de:'UK-Pint', fr:'pinte UK', zh:'英品脱', pt:'pinta (RU)',
      ar:'باينت بريطاني', hi:'यूके पिंट', ja:'英パイント' },
    { en:'pt (UK)', ru:'пинта (брит.)', es:'pt (UK)', de:'pt (UK)',
      fr:'pt (UK)', zh:'pt (UK)', pt:'pt (UK)', ar:'pt', hi:'pt', ja:'pt' },
    5.68261e-4,
    ['ptuk','ukpt','пинта (брит.)']
  ),

  /* US cup -------------------------------------------------------------- */
  makeUnit(
    { en:'US cup', ru:'чашка (США)', es:'taza (EE.UU.)',
      de:'US-Cup', fr:'cup US', zh:'美杯', pt:'copo (EUA)',
      ar:'كوب أمريكي', hi:'यूएस कप', ja:'米カップ' },
    { en:'cup (US)', ru:'чашка', es:'cup (US)', de:'cup (US)',
      fr:'cup (US)', zh:'cup (US)', pt:'cup (US)', ar:'cup', hi:'cup', ja:'cup' },
    2.36588e-4,
    ['cup','uscup','чашка']
  ),

  /* US tablespoon ------------------------------------------------------- */
  makeUnit(
    { en:'US tablespoon', ru:'столовая ложка', es:'cucharada (EE.UU.)',
      de:'US-Esslöffel', fr:'cuillère à soupe US', zh:'美汤匙',
      pt:'colher sopa (EUA)', ar:'ملعقة كبيرة أمريكية', hi:'टेबलस्पून US', ja:'米大さじ' },
    { en:'tbsp (US)', ru:'ст. лож.', es:'tbsp (US)', de:'tbsp (US)',
      fr:'tbsp (US)', zh:'tbsp', pt:'tbsp (US)', ar:'tbsp', hi:'tbsp', ja:'tbsp' },
    1.47868e-5,
    ['tbsp','tablespoon','stl']
  ),

  /* US teaspoon --------------------------------------------------------- */
  makeUnit(
    { en:'US teaspoon', ru:'чайная ложка', es:'cucharadita (EE.UU.)',
      de:'US-Teelöffel', fr:'cuillère à café US', zh:'美茶匙',
      pt:'colher chá (EUA)', ar:'ملعقة صغيرة أمريكية', hi:'टीस्पून US', ja:'米小さじ' },
    { en:'tsp (US)', ru:'ч. лож.', es:'tsp (US)', de:'tsp (US)',
      fr:'tsp (US)', zh:'tsp', pt:'tsp (US)', ar:'tsp', hi:'tsp', ja:'tsp' },
    4.92892e-6,
    ['tsp','teaspoon','chl']
  ),

  /* oil barrel ---------------------------------------------------------- */
  makeUnit(
    { en:'oil barrel (US)', ru:'баррель нефти (США)', es:'barril de crudo (EE.UU.)',
      de:'Ölfass (US)', fr:'baril de pétrole (US)', zh:'石油桶',
      pt:'barril de petróleo', ar:'برميل نفط', hi:'तेल बैरल', ja:'石油バレル' },
    { en:'bbl (US)', ru:'бар', es:'bbl', de:'bbl', fr:'bbl',
      zh:'bbl', pt:'bbl', ar:'bbl', hi:'bbl', ja:'bbl' },
    0.158987,
    ['bbl','barrel','бар']
  ),

  /* MSCF ---------------------------------------------------------------- */
  makeUnit(
    { en:'MSCF (thousand scf)', ru:'тскф', es:'MSCF',
      de:'MSCF', fr:'MSCF', zh:'千标方英尺', pt:'MSCF',
      ar:'MSCF', hi:'MSCF', ja:'MSCF' },
    { en:'MSCF', ru:'тскф', es:'MSCF', de:'MSCF', fr:'MSCF',
      zh:'MSCF', pt:'MSCF', ar:'MSCF', hi:'MSCF', ja:'MSCF' },
    28.3168,
    ['mscf','тскф']
  ),

  /* MMSCF --------------------------------------------------------------- */
  makeUnit(
    { en:'MMSCF (million scf)', ru:'мскф', es:'MMSCF',
      de:'MMSCF', fr:'MMSCF', zh:'百万标方英尺', pt:'MMSCF',
      ar:'MMSCF', hi:'MMSCF', ja:'MMSCF' },
    { en:'MMSCF', ru:'мскф', es:'MMSCF', de:'MMSCF', fr:'MMSCF',
      zh:'MMSCF', pt:'MMSCF', ar:'MMSCF', hi:'MMSCF', ja:'MMSCF' },
    28316.8,
    ['mmscf','мскф']
  )
];

export default volumeUnits;
