// src/units/_factory.js
/**
 * Фабрика единой структуры для любой физической единицы.
 *
 * @param {Object} names   – объект «язык → название»
 * @param {Object} symbol  – объект «язык → символ/обозначение»
 * @param {number} factor  – коэффициент к базовой единице категории (в СИ)
 * @param {string[]} [aliases=[]] – дополнительные строковые алиасы
 * @returns {{names:Object,symbol:Object,factor:number,aliases:string[]}}
 */
export function makeUnit(names, symbol, factor, aliases = []) {
  return { names, symbol, factor, aliases };
}
