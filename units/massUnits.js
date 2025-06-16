import { makeUnit } from './_factory.js';

const massUnits = [
    /* килограмм (базовый) ------------------------------------------------- */
    makeUnit(
      { en:'kilogram', ru:'килограмм', es:'kilogramo', de:'Kilogramm',
        fr:'kilogramme', zh:'千克', pt:'quilograma', ar:'كيلوجرام',
        hi:'किलोग्राम', ja:'キログラム' },
      { en:'kg', ru:'кг', es:'kg', de:'kg', fr:'kg', zh:'kg', pt:'kg',
        ar:'كجم', hi:'kg', ja:'kg' },
      1, ['kg','кг']
    ),

    /* микрограмм 10⁻⁹ кг -------------------------------------------------- */
    makeUnit(
      { en:'microgram', ru:'микрограмм', es:'microgramo', de:'Mikrogramm',
        fr:'microgramme', zh:'微克', pt:'micrograma', ar:'ميكروغرام',
        hi:'माइक्रोग्राम', ja:'マイクログラム' },
      { en:'µg', ru:'мкг', es:'µg', de:'µg', fr:'µg', zh:'µg', pt:'µg',
        ar:'µg', hi:'µg', ja:'µg' },
      1e-9, ['ug','µg','мкг']
    ),

    /* миллиграмм 10⁻⁶ кг -------------------------------------------------- */
    makeUnit(
      { en:'milligram', ru:'миллиграмм', es:'miligramo', de:'Milligramm',
        fr:'milligramme', zh:'毫克', pt:'miligrama', ar:'ميليغرام',
        hi:'मिलिग्राम', ja:'ミリグラム' },
      { en:'mg', ru:'мг', es:'mg', de:'mg', fr:'mg', zh:'mg', pt:'mg',
        ar:'mg', hi:'mg', ja:'mg' },
      1e-6, ['mg','мг']
    ),

    /* грамм 10⁻³ кг ------------------------------------------------------- */
    makeUnit(
      { en:'gram', ru:'грамм', es:'gramo', de:'Gramm', fr:'gramme',
        zh:'克', pt:'grama', ar:'غرام', hi:'ग्राम', ja:'グラム' },
      { en:'g', ru:'г', es:'g', de:'g', fr:'g', zh:'g', pt:'g',
        ar:'g', hi:'g', ja:'g' },
      1e-3, ['g','гр','г']
    ),

    /* центнер (metric hundredweight) 100 кг ------------------------------- */
    makeUnit(
      { en:'centner', ru:'центнер', es:'centner', de:'Zentner',
        fr:'quintal', zh:'公担', pt:'quintal', ar:'قنطار',
        hi:'क्विंटल', ja:'センタル' },
      { en:'q', ru:'ц', es:'q', de:'q', fr:'q', zh:'q', pt:'q',
        ar:'q', hi:'q', ja:'q' },
      100, ['q','ц']
    ),

    /* тонна (metric ton) 1000 кг ----------------------------------------- */
    makeUnit(
      { en:'tonne', ru:'тонна', es:'tonelada', de:'Tonne', fr:'tonne',
        zh:'吨', pt:'tonelada', ar:'طن', hi:'टन', ja:'トン' },
      { en:'t', ru:'т', es:'t', de:'t', fr:'t', zh:'t', pt:'t',
        ar:'t', hi:'t', ja:'t' },
      1000, ['t','тонна','т']
    ),

    /* фунт (avoirdupois) -------------------------------------------------- */
    makeUnit(
      { en:'pound', ru:'фунт', es:'libra', de:'Pfund', fr:'livre',
        zh:'磅', pt:'libra', ar:'رطل', hi:'पाउंड', ja:'ポンド' },
      { en:'lb', ru:'фн', es:'lb', de:'lb', fr:'lb', zh:'lb', pt:'lb',
        ar:'lb', hi:'lb', ja:'lb' },
      0.45359237, ['lb','lbs','фн','фунт']
    ),

    /* унция --------------------------------------------------------------- */
    makeUnit(
      { en:'ounce', ru:'унция', es:'onza', de:'Unze', fr:'once',
        zh:'盎司', pt:'onça', ar:'أوقية', hi:'औंस', ja:'オンス' },
      { en:'oz', ru:'унц', es:'oz', de:'oz', fr:'oz', zh:'oz', pt:'oz',
        ar:'oz', hi:'oz', ja:'oz' },
      0.028349523125, ['oz','унц']
    ),

    /* стоун ----------------------------------------------------------------*/
    makeUnit(
      { en:'stone', ru:'стоун', es:'stone', de:'Stone', fr:'stone',
        zh:'英石', pt:'stone', ar:'ستون', hi:'स्टोन', ja:'ストーン' },
      { en:'st', ru:'ст', es:'st', de:'st', fr:'st', zh:'st', pt:'st',
        ar:'st', hi:'st', ja:'st' },
      14.59390294, ['st','стоун','ст']
    ),

    /* карат ----------------------------------------------------------------*/
    makeUnit(
      { en:'carat', ru:'карат', es:'quilate', de:'Karat', fr:'carat',
        zh:'克拉', pt:'quilate', ar:'قيراط', hi:'कैरेट', ja:'カラット' },
      { en:'ct', ru:'кт', es:'ct', de:'ct', fr:'ct', zh:'ct', pt:'ct',
        ar:'ct', hi:'ct', ja:'ct' },
      0.0002, ['ct','кт']
    ),

    /* атомная единица массы (далтон) -------------------------------------- */
    makeUnit(
      { en:'atomic mass unit', ru:'атомная единица массы',
        es:'unidad de masa atómica', de:'Atomare Masseneinheit',
        fr:'unité de masse atomique', zh:'原子质量单位', pt:'unidade de massa atómica',
        ar:'وحدة كتلة ذرية', hi:'परमाणु द्रव्यमान इकाई', ja:'原子質量単位' },
      { en:'u', ru:'а.е.м.', es:'u', de:'u', fr:'u', zh:'u',
        pt:'u', ar:'u', hi:'u', ja:'u' },
      1.6605390666e-27, ['u','amu','а.е.м.']
    )
  ];

export default massUnits;
