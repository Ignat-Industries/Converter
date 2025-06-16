/* temperatureUnits.js */
import { makeUnit } from './_factory.js';

export default [
  /* Kelvin, Celsius, Fahrenheit уже есть – оставляем */
  makeUnit(
    { en:'Kelvin',     ru:'Кельвин',     es:'Kelvin',        de:'Kelvin',
      fr:'Kelvin',     zh:'开尔文',      pt:'Kelvin',        ar:'كلفن',
      hi:'केल्विन',     ja:'ケルビン' },
    { en:'K', ru:'K', es:'K', de:'K', fr:'K', zh:'K', pt:'K', ar:'K', hi:'K', ja:'K' }
  ),

  makeUnit(
    { en:'Celsius',    ru:'градус Цельсия', es:'Celsius',     de:'Celsius',
      fr:'Celsius',    zh:'摄氏度',         pt:'Celsius',     ar:'سيلسيوس',
      hi:'सेल्सियस',    ja:'セルシウス度' },
    { en:'°C', ru:'°C', es:'°C', de:'°C', fr:'°C', zh:'°C', pt:'°C', ar:'°C', hi:'°C', ja:'°C' }
  ),

  makeUnit(
    { en:'Fahrenheit', ru:'градус Фаренгейта', es:'Fahrenheit', de:'Fahrenheit',
      fr:'Fahrenheit', zh:'华氏度',              pt:'Fahrenheit', ar:'فهرنهايت',
      hi:'फ़ारेनहाइट',  ja:'華氏度' },
    { en:'°F', ru:'°F', es:'°F', de:'°F', fr:'°F', zh:'°F', pt:'°F', ar:'°F', hi:'°F', ja:'°F' }
  ),

  /* ------- новые шкалы -------- */
  makeUnit(
    { en:'Rankine',    ru:'градус Ранкина', es:'Rankine',     de:'Rankine',
      fr:'Rankine',    zh:'兰金度',         pt:'Rankine',     ar:'رانكين',
      hi:'रैंकाइन',     ja:'ランキン度' },
    { en:'°R', ru:'°R', es:'°R', de:'°R', fr:'°R', zh:'°R', pt:'°R', ar:'°R', hi:'°R', ja:'°R' }
  ),
  makeUnit(
    { en:'Réaumur',    ru:'градус Реомюра', es:'Réaumur',     de:'Réaumur',
      fr:'Réaumur',    zh:'列氏度',          pt:'Réaumur',     ar:'ريومر',
      hi:'रियोम्यूर',    ja:'レオミュール度' },
    { en:'°Ré', ru:'°Ré', es:'°Ré', de:'°Ré', fr:'°Ré', zh:'°Ré', pt:'°Ré', ar:'°Ré', hi:'°Ré', ja:'°Ré' }
  ),
  makeUnit(
    { en:'Newton',     ru:'градус Ньютона', es:'Newton',      de:'Newton',
      fr:'Newton',     zh:'牛頓度',          pt:'Newton',      ar:'نيوتن',
      hi:'न्यूटन',       ja:'ニュートン度' },
    { en:'°N', ru:'°N', es:'°N', de:'°N', fr:'°N', zh:'°N', pt:'°N', ar:'°N', hi:'°N', ja:'°N' }
  ),
  makeUnit(
    { en:'Delisle',    ru:'градус Дельзиля', es:'Delisle',     de:'Delisle',
      fr:'Delisle',    zh:'德利尔度',        pt:'Delisle',     ar:'دليزل',
      hi:'डेलिसल',       ja:'ドリスル度' },
    { en:'°De', ru:'°De', es:'°De', de:'°De', fr:'°De', zh:'°De', pt:'°De', ar:'°De', hi:'°De', ja:'°De' }
  ),
  makeUnit(
    { en:'Rømer',      ru:'градус Рёмера',  es:'Rømer',       de:'Rømer',
      fr:'Rømer',      zh:'罗默度',          pt:'Rømer',       ar:'رومر',
      hi:'रोमर',         ja:'ローマー度' },
    { en:'°Rø', ru:'°Rø', es:'°Rø', de:'°Rø', fr:'°Rø', zh:'°Rø', pt:'°Rø', ar:'°Rø', hi:'°Rø', ja:'°Rø' }
  )
];
