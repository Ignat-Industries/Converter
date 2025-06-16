/* Давление (Pa – база) */
import { makeUnit } from './_factory.js';   // если фабрика лежит отдельно

const pressureUnits = [
  makeUnit(
    { ru:'паскаль', en:'pascal', es:'pascal', de:'Pascal', fr:'pascal',
      zh:'帕', pt:'pascal', ar:'باسكال', hi:'पास्कल', ja:'パスカル' },
    { ru:'Па', en:'Pa' },                           1,           ['Pa','па','паскаль'] ),

  makeUnit(
    { ru:'бар', en:'bar', es:'bar', de:'Bar', fr:'bar',
      zh:'巴', pt:'bar', ar:'بار', hi:'बार', ja:'バール' },
    { ru:'бар', en:'bar' },                         1e5,         ['бар','bar'] ),

  makeUnit(
    { ru:'атмосфера (физическая)', en:'standard atmosphere',
      es:'atmósfera', de:'Atmosphäre', fr:'atmosphère',
      zh:'标准大气压', pt:'atmosfera', ar:'جوّ', hi:'वायुमण्डल', ja:'標準大気圧' },
    { ru:'атм',  en:'atm' },                        101325,      ['atm','атм'] ),

  makeUnit(
    { ru:'миллиметр ртутного столба', en:'millimetre of mercury',
      es:'milímetro de mercurio', de:'Millimeter Quecksilbersäule', fr:'millimètre de mercure',
      zh:'毫米汞柱', pt:'milímetro de mercúrio', ar:'ملم زئبق', hi:'मि‍ली मीटर पारद दाब', ja:'水銀柱ミリメートル' },
    { ru:'мм рт. ст.', en:'mm Hg' },                133.322,     ['mmHg','ммрт','мм рт. ст.'] ),

  makeUnit(
    { ru:'миллиметр водяного столба', en:'millimetre of water',
      es:'milímetro de agua', de:'Millimeter Wassersäule', fr:'millimètre de colonne d’eau',
      zh:'毫米水柱', pt:'milímetro de água', ar:'ملم ماء', hi:'मिमी जल स्तम्भ', ja:'水柱ミリメートル' },
    { ru:'мм вод. ст.', en:'mm H2O' },              9.80665,     ['mmH2O','ммвод','мм вод. ст.'] ),

  makeUnit(
    { ru:'фунт-сила/дюйм²', en:'pound-force per square inch',
      es:'libra-fuerza por pulgada²', de:'Pfund-kraft pro Quadratzoll',
      fr:'livre-force par pouce²', zh:'磅力/平方英寸', pt:'psi', ar:'رطل-قوة/بوصة²',
      hi:'पाउंड-फ़ोर्स/इंच²', ja:'ポンド力/平方インチ' },
    { ru:'фн/дюйм²', en:'psi' },                    6894.757,    ['psi','фн/дюйм²','lbs/in²'] ),

  makeUnit(
    { ru:'кгс/см²', en:'kilogram-force per cm²', es:'kgf/cm²',
      de:'Kilopond/cm²', fr:'kgf/cm²', zh:'公斤力/平方厘米',
      pt:'kgf/cm²', ar:'كجم-قوة/سم²', hi:'किग्रा-बल/सेमी²', ja:'kgf/cm²' },
    { ru:'кгс/см²', en:'kg/cm²' },                  98066.5,     ['kgf/cm²','кгс/см²'] ),

  makeUnit(
    { ru:'гектопаскаль', en:'hectopascal', es:'hectopascal', de:'Hektopascal',
      fr:'hectopascal', zh:'百帕', pt:'hectopascal', ar:'هكتوباسكال',
      hi:'हेक्टोपास्कल', ja:'ヘクトパスカル' },
    { ru:'гПа', en:'hPa' },                         100,         ['hPa','гПа'] ),

  makeUnit(
    { ru:'килопаскаль', en:'kilopascal', es:'kilopascal', de:'Kilopascal',
      fr:'kilopascal', zh:'千帕', pt:'kilopascal', ar:'كيلوباسكال',
      hi:'किलोपास्कल', ja:'キロパスカル' },
    { ru:'кПа', en:'kPa' },                         1_000,       ['kPa','кПа'] ),

  makeUnit(
    { ru:'мегапаскаль', en:'megapascal', es:'megapascal', de:'Megapascal',
      fr:'mégapascal', zh:'兆帕', pt:'megapascal', ar:'ميغاباسكال',
      hi:'मेगापास्कल', ja:'メガパスカル' },
    { ru:'МПа', en:'MPa' },                         1_000_000,   ['MPa','МПа'] ),

  makeUnit(  /* tech atm == kgf/cm² */
    { ru:'атмосфера техническая', en:'technical atmosphere', es:'atmósfera técnica',
      de:'Technische Atmosphäre', fr:'atmosphère technique',
      zh:'技术大气压', pt:'atm técnica', ar:'جوّ تقني', hi:'प्रौद्योगिक वायुमण्डल', ja:'技術大気圧' },
    { ru:'ат', en:'tech atm' },                     98066.5,     ['ат','tech atm'] ),

  makeUnit(
    { ru:'торр', en:'torr', es:'torr', de:'Torr', fr:'torr',
      zh:'托', pt:'torr', ar:'تور', hi:'टॉर', ja:'トル' },
    { ru:'Тр', en:'Torr' },                         133.322368,  ['Torr','торр','тр'] ),

  makeUnit(
    { ru:'миллибар', en:'millibar', es:'milibar', de:'Millibar', fr:'millibar',
      zh:'毫巴', pt:'milibar', ar:'مليبار', hi:'मिलिबार', ja:'ミリバール' },
    { ru:'мбар', en:'mbar' },                       100,         ['mbar','мбар'] ),

  makeUnit(
    { ru:'кгс/м²', en:'kilogram-force per m²', es:'kgf/m²', de:'Kilopond/m²',
      fr:'kgf/m²', zh:'公斤力/平方米', pt:'kgf/m²', ar:'كجم-قوة/م²',
      hi:'किग्रा-बल/मीटर²', ja:'kgf/m²' },
    { ru:'кгс/м²', en:'kgf/m²' },                   9.80665,     ['kgf/m²','кгс/м²'] ),
];

export default pressureUnits
