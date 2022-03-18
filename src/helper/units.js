const KELVIN      = 'Kelvin';
const CELSIUS     = 'Celsius';
const FAHRENHEIT  = 'Fahrenheit';
const RANKINE     = 'Rankine';
const LITERS      = 'liters';
const TABLESPOONS = 'tablespoons';
const CUBICINCHES = 'cubic-inches';
const CUPS        = 'cups';
const CUBICFEET   = 'cubic-feet';
const GALLONS     = 'gallons';

export const tempOptions = [ KELVIN,
                             CELSIUS,
                             FAHRENHEIT,
                             RANKINE,
                           ];

export const volumeOptions = [ LITERS,
                               TABLESPOONS,
                               CUBICINCHES,
                               CUPS,
                               CUBICFEET,
                               GALLONS,
                             ];

// used by ProblemForm to generate select options
export const unitOptions = tempOptions.concat(volumeOptions);


// constants for converting from <unit> to celsius
// _S: scalar
// _M: multiplier
const KELVIN_S = 273.15;

const FAHRENHEIT_S = 32;
const FAHRENHEIT_M = 1.8;

const RANKINE_S = 491.67;
const RANKINE_M = 9/5;


// constants for converting from <unit> to liters
  // Assume US Tablespoons
    // TODO clarify with client
  // https://www.metric-conversions.org/volume/us-tablespoons-to-liters.htm
// NOTE, these values must be correct to >4 digits for accurate results
const TABLESPOONS_M = 67.628045;

const CUBICINCHES_M = 61.023744;

  // Assume US Cups
    // TODO clarify with client
  // https://www.convertunits.com/from/liters/to/US+cup
const CUPS_M = 4.22675;

const CUBICFEET_M = 0.03531467;

  // Assume US Liquid Gallons
    // TODO clarify with client
const GALLONS_M = 0.2641729;


const isNumeric = n => !isNaN(n);

export const unitFuncs = {
    isTemperature: function(inputUnit, targetUnit) {
        return ( tempOptions.includes(inputUnit) &&
                 tempOptions.includes(targetUnit) );
    },
    isVolume: function(inputUnit, targetUnit) {
        return ( volumeOptions.includes(inputUnit) &&
                 volumeOptions.includes(targetUnit) );
    },
    isValidUnits: function(inputUnit, targetUnit) {
        return ( (this.isTemperature(inputUnit, targetUnit)) ||
                 (this.isVolume(inputUnit, targetUnit)) );
    },
    isValidNums: function(inputNum, targetResponse) {
        return ( (isNumeric(inputNum)) &&
                 (isNumeric(targetResponse)) );
    },

    /*
      Branch to tempConvert or volumeConvert
      Throw for invalid units
    */
    unitConvert: function(inputNum, inputUnit, targetUnit) {
        if( this.isTemperature(inputUnit, targetUnit) ) {
            return this.tempConvert(inputNum,
                                    inputUnit,
                                    targetUnit);
        }
        else if( this.isVolume(inputUnit, targetUnit) ) {
            return this.volumeConvert(inputNum,
                                      inputUnit,
                                      targetUnit);
        }
        else {
            throw Error('Invalid Units!');
        }
    },
    tempConvert: function(inputNum, inputUnit, targetUnit) {
        // normalize to celsius
        var normTemp = this.normalizeTemp(inputNum, inputUnit);

        // convert to target unit
        switch(targetUnit) {
            case CELSIUS:
                return normTemp;
            case KELVIN:
                return normTemp + KELVIN_S;
            case FAHRENHEIT:
                return (FAHRENHEIT_M * normTemp) + FAHRENHEIT_S;
            case RANKINE:
                return (RANKINE_M * normTemp) + RANKINE_S;
            default:
                return NaN;
        }
    },
    /*
      returns inputNum as celsius
      expects temperature input
    */
    normalizeTemp: function(inputNum, inputUnit) {
        switch(inputUnit) {
            case CELSIUS:
                return inputNum;
            case KELVIN:
                return inputNum - KELVIN_S
            case FAHRENHEIT:
                return (inputNum - FAHRENHEIT_S) / FAHRENHEIT_M;
            case RANKINE:
                return (inputNum - RANKINE_S) / RANKINE_M;
            default:
                return NaN;
        }
    },
    volumeConvert: function(inputNum, inputUnit, targetUnit) {
        // normalize to liters
        var normVolume = this.normalizeVolume(inputNum, inputUnit);

        // convert to target unit
        switch(targetUnit) {
            case LITERS:
                return normVolume;
            case TABLESPOONS:
                return normVolume * TABLESPOONS_M;
            case CUBICINCHES:
                return normVolume * CUBICINCHES_M;
            case CUPS:
                return normVolume * CUPS_M;
            case CUBICFEET:
                return normVolume * CUBICFEET_M;
            case GALLONS:
                return normVolume * GALLONS_M;
            default:
                return NaN;
        }
    },
    /*
      returns inputNum as liters
      expects volume input
    */
    normalizeVolume: function(inputNum, inputUnit) {
        switch(inputUnit) {
            case LITERS:
                return inputNum;
            case TABLESPOONS:
                return inputNum / TABLESPOONS_M;
            case CUBICINCHES:
                return inputNum / CUBICINCHES_M;
            case CUPS:
                return inputNum / CUPS_M;
            case CUBICFEET:
                return inputNum / CUBICFEET_M;
            case GALLONS:
                return inputNum / GALLONS_M;
            default:
                return NaN;
        }
    },
}

