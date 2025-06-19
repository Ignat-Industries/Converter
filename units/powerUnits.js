/* Мощность (W – база) */
import { makeUnit } from './factory.js';

const powerUnits = [
  makeUnit(
    { ru:'ватт', en:'watt', es:'vatio', de:'Watt', fr:'watt',
      zh:'瓦', pt:'watt', ar:'واط', hi:'वाट', ja:'ワット' },
    { ru:'Вт', en:'W' },                            1,            ['W','Вт','ватт'] ),

  makeUnit(
    { ru:'милливатт', en:'milliwatt', es:'mili-vatio', de:'Milliwatt',
      fr:'milliwatt', zh:'毫瓦', pt:'miliwatt', ar:'ميلي-واط',
      hi:'मिलिवाट', ja:'ミリワット' },
    { ru:'мВт', en:'mW' },                          1e-3,         ['mW','мВт'] ),

  makeUnit(
    { ru:'киловатт', en:'kilowatt', es:'kilovatio', de:'Kilowatt',
      fr:'kilowatt', zh:'千瓦', pt:'kilowatt', ar:'كيلوواط',
      hi:'किलोवाट', ja:'キロワット' },
    { ru:'кВт', en:'kW' },                          1_000,        ['kW','кВт'] ),

  makeUnit(
    { ru:'мегаватт', en:'megawatt', es:'megavatio', de:'Megawatt',
      fr:'mégawatt', zh:'兆瓦', pt:'megawatt', ar:'ميغاواط',
      hi:'मेगावाट', ja:'メガワット' },
    { ru:'МВт', en:'MW' },                          1_000_000,    ['MW','МВт'] ),

  makeUnit(
    { ru:'лошадиная сила (англ.)', en:'horse-power (mechanical)', es:'caballo de fuerza (imp.)',
      de:'Pferdestärke (imperial)', fr:'cheval-vapeur (imp.)',
      zh:'英制马力', pt:'cavalo-vapor (imp.)', ar:'حصان ميكانيكي',
      hi:'घोड़ा-शक्ति (अंग्रेज़ी)', ja:'馬力（英）' },
    { ru:'л.с. (англ.)', en:'hp' },                 745.699872,   ['hp','лс англ','л.с. (англ.)'] ),

  makeUnit(
    { ru:'лошадиная сила (метрическая)', en:'horse-power (metric)',
      es:'caballo de fuerza (métrico)', de:'Pferdestärke (metrisch)',
      fr:'cheval-vapeur (métrique)', zh:'公制马力', pt:'cavalo-vapor (métrico)',
      ar:'حصان متري', hi:'घोड़ा-शक्ति (मी.)', ja:'馬力（仏）' },
    { ru:'л.с.', en:'hp (metric)' },                735.49875,    ['metric hp','лс','л.с.'] ),

  makeUnit(
    { ru:'лошадиная сила (русская)', en:'horse-power (Russian)',
      es:'caballo ruso', de:'Russische PS', fr:'cheval russe', zh:'俄制马力',
      pt:'cavalo-vapor (russo)', ar:'حصان روسي', hi:'रूसी हॉर्सपावर', ja:'馬力（露）' },
    { ru:'л.с. (рус.)', en:'—' },                   980.665,      ['лс рус','л.с. рус'] ),

  makeUnit(
    { ru:'БТЕ/ч', en:'BTU per hour', es:'BTU/h', de:'BTU pro Stunde',
      fr:'BTU/heure', zh:'英热单位/时', pt:'BTU/h', ar:'وحدة حرارية بريطانية/س',
      hi:'BTU/घंटा', ja:'BTU/h' },
    { ru:'БТЕ/ч', en:'BTU/h' },                     0.29307107,   ['BTU/h','БТЕ/ч'] ),

  makeUnit(
    { ru:'БТЕ/с', en:'BTU per second', es:'BTU/s', de:'BTU pro Sekunde',
      fr:'BTU/seconde', zh:'英热单位/秒', pt:'BTU/s', ar:'وحدة حرارية بريطانية/ث',
      hi:'BTU/से', ja:'BTU/s' },
    { ru:'БТЕ/с', en:'BTU/s' },                     1055.05585,   ['BTU/s','БТЕ/с'] ),

  makeUnit(
    { ru:'PS (немецкая л.с.)', en:'Pferdestärke', es:'cavallo vapore (PS)',
      de:'Pferdestärke', fr:'pferdestärke', zh:'德制马力', pt:'Pferdestärke',
      ar:'حصان ألماني', hi:'PS घोड़ा-शक्ति', ja:'ドイツ馬力' },
    { ru:'PS', en:'PS' },                           735.49875,    ['PS','пс'] ),

  makeUnit(
    { ru:'фт·фн/с', en:'foot-pound per second', es:'pie-libra/s',
      de:'ft·lb/s', fr:'ft·lb/s', zh:'英尺-磅/秒', pt:'ft·lb/s',
      ar:'قدم-رطل/ث', hi:'ft-lb/s', ja:'ft·lb/s' },
    { ru:'фт·фн/с', en:'ft·lb/s' },                 1.355817948,  ['ft·lb/s','фтфн/с'] ),

  makeUnit(
    { ru:'микроватт', en:'microwatt', es:'microvatio', de:'Mikrowatt', fr:'microwatt',
      zh:'微瓦', pt:'microwatt', ar:'ميكروواط', hi:'माइक्रोवाट', ja:'マイクロワット' },
    { ru:'мкВт', en:'µW' },                         1e-6,         ['µW','мкВт'] ),
];

export default powerUnits