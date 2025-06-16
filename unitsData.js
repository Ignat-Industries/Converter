// unitsData.js

// Импортируем все массивы единиц измерения из соответствующих файлов
import conductanceUnits from './units/conductanceUnits.js';
import currentUnits from './units/currentUnits.js';
import energyUnits from './units/energyUnits.js';
import flowUnits from './units/flowUnits.js';
import lengthUnits from './units/lengthUnits.js';
import massUnits from './units/massUnits.js';
import powerUnits from './units/powerUnits.js';
import pressureUnits from './units/pressureUnits.js';
import resistanceUnits from './units/resistanceUnits.js';
import temperatureUnits  from './units/temperatureUnits.js';
import timeUnits  from './units/timeUnits.js';
import voltageUnits  from './units/voltageUnits.js';
import volumeUnits  from './units/volumeUnits.js';

/**
 * Объект, содержащий все категории единиц измерения.
 * Каждая категория - это массив объектов единиц.
 */
const unitsData = {
    conductance: conductanceUnits,
    current: currentUnits,
    energy: energyUnits,
    flow: flowUnits,
    length: lengthUnits,
    mass: massUnits,
    power: powerUnits,
    pressure: pressureUnits,
    resistance: resistanceUnits,
    temperature: temperatureUnits,
    time: timeUnits,
    voltage: voltageUnits,
    volume: volumeUnits,
};

export default unitsData;