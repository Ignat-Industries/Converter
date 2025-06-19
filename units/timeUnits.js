import { makeUnit } from './factory.js';

const timeUnits = [
    /* секунда (база) ------------------------------------------------------- */
    makeUnit(
      { en:'second', ru:'секунда', es:'segundo', de:'Sekunde',
        fr:'seconde', zh:'秒', pt:'segundo', ar:'ثانية',
        hi:'सेकंड', ja:'秒' },
      { en:'s', ru:'с', es:'s', de:'s', fr:'s', zh:'s', pt:'s',
        ar:'ث', hi:'s', ja:'s' },
      1, ['s','sec','с']
    ),

    /* миллисекунда 10⁻³ с -------------------------------------------------- */
    makeUnit(
      { en:'millisecond', ru:'миллисекунда', es:'milisegundo', de:'Millisekunde',
        fr:'milliseconde', zh:'毫秒', pt:'milissegundo', ar:'مللي ثانية',
        hi:'मिलीसेकंड', ja:'ミリ秒' },
      { en:'ms', ru:'мс', es:'ms', de:'ms', fr:'ms', zh:'ms', pt:'ms',
        ar:'ms', hi:'ms', ja:'ms' },
      1e-3, ['ms','мс']
    ),

    /* микросекунда 10⁻⁶ с -------------------------------------------------- */
    makeUnit(
      { en:'microsecond', ru:'микросекунда', es:'microsegundo', de:'Mikrosekunde',
        fr:'microseconde', zh:'微秒', pt:'microssegundo', ar:'ميكروثانية',
        hi:'माइक्रोसेकंड', ja:'マイクロ秒' },
      { en:'µs', ru:'мкс', es:'µs', de:'µs', fr:'µs', zh:'µs', pt:'µs',
        ar:'µs', hi:'µs', ja:'µs' },
      1e-6, ['us','µs','мкс']
    ),

    /* наносекунда 10⁻⁹ с --------------------------------------------------- */
    makeUnit(
      { en:'nanosecond', ru:'наносекунда', es:'nanosegundo', de:'Nanosekunde',
        fr:'nanoseconde', zh:'纳秒', pt:'nanosegundo', ar:'نانوسекند',
        hi:'नैनोसेकंड', ja:'ナノ秒' },
      { en:'ns', ru:'нс', es:'ns', de:'ns', fr:'ns', zh:'ns', pt:'ns',
        ar:'ns', hi:'ns', ja:'ns' },
      1e-9, ['ns','нс']
    ),

    /* минута --------------------------------------------------------------- */
    makeUnit(
      { en:'minute', ru:'минута', es:'minuto', de:'Minute',
        fr:'minute', zh:'分钟', pt:'minuto', ar:'دقيقة',
        hi:'मिनट', ja:'分' },
      { en:'min', ru:'мин', es:'min', de:'min', fr:'min', zh:'min', pt:'min',
        ar:'min', hi:'min', ja:'min' },
      60, ['min','мин']
    ),

    /* час ------------------------------------------------------------------ */
    makeUnit(
      { en:'hour', ru:'час', es:'hora', de:'Stunde',
        fr:'heure', zh:'小时', pt:'hora', ar:'ساعة',
        hi:'घंटा', ja:'時間' },
      { en:'h', ru:'ч', es:'h', de:'h', fr:'h', zh:'h', pt:'h',
        ar:'h', hi:'h', ja:'h' },
      3600, ['h','hr','ч']
    ),

    /* сутки ----------------------------------------------------------------*/
    makeUnit(
      { en:'day', ru:'сутки', es:'día', de:'Tag',
        fr:'jour', zh:'天', pt:'dia', ar:'يوم',
        hi:'दिन', ja:'日' },
      { en:'d', ru:'сут', es:'d', de:'d', fr:'d', zh:'d', pt:'d',
        ar:'d', hi:'d', ja:'d' },
      86400, ['d','сут','day']
    ),

    /* неделя --------------------------------------------------------------- */
    makeUnit(
      { en:'week', ru:'неделя', es:'semana', de:'Woche',
        fr:'semaine', zh:'星期', pt:'semana', ar:'أسبوع',
        hi:'सप्ताह', ja:'週間' },
      { en:'wk', ru:'нд', es:'wk', de:'wk', fr:'wk', zh:'wk', pt:'wk',
        ar:'wk', hi:'wk', ja:'wk' },
      604800, ['wk','нед','нд']
    ),

    /* календарный год (365 дней) ------------------------------------------ */
    makeUnit(
      { en:'calendar year', ru:'календарный год', es:'año calendario',
        de:'Kalenderjahr', fr:'année civile', zh:'历年', pt:'ano civil',
        ar:'سنة تقويمية', hi:'पंचांग वर्ष', ja:'暦年' },
      { en:'cal yr', ru:'г', es:'cal yr', de:'cal yr', fr:'cal yr',
        zh:'cal yr', pt:'cal yr', ar:'cal yr', hi:'cal yr', ja:'cal yr' },
      31536000, ['calyr','cal yr','г']
    ),

    /* тропический год (был в исходнике) ----------------------------------- */
    makeUnit(
      { en:'year', ru:'год', es:'año', de:'Jahr',
        fr:'an', zh:'年', pt:'ano', ar:'سنة',
        hi:'साल', ja:'年' },
      { en:'yr', ru:'год', es:'yr', de:'yr', fr:'yr', zh:'yr', pt:'yr',
        ar:'yr', hi:'yr', ja:'yr' },
      31557600, ['yr','год']
    )
  ];

export default timeUnits;