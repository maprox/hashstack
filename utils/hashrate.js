export const HASH = Symbol('Hash');
export const KILO_HASH = Symbol('KiloHash');
export const MEGA_HASH = Symbol('MegaHash');
export const GIGA_HASH = Symbol('GigaHash');
export const TERA_HASH = Symbol('TeraHash');
export const PETA_HASH = Symbol('PetaHash');
export const EXA_HASH = Symbol('ExaHash');
export const ZETTA_HASH = Symbol('ZettaHash');

export const units = [
  HASH,
  KILO_HASH,
  MEGA_HASH,
  GIGA_HASH,
  TERA_HASH,
  PETA_HASH,
  EXA_HASH,
  ZETTA_HASH,
];

export const unitNames = {
  [HASH]: 'Hash',
  [KILO_HASH]: 'KiloHash',
  [MEGA_HASH]: 'MegaHash',
  [GIGA_HASH]: 'GigaHash',
  [TERA_HASH]: 'TeraHash',
  [PETA_HASH]: 'PetaHash',
  [EXA_HASH]: 'ExaHash',
  [ZETTA_HASH]: 'ZettaHash',
};

export const unitShortNames = {
  [HASH]: 'H',
  [KILO_HASH]: 'KH',
  [MEGA_HASH]: 'MH',
  [GIGA_HASH]: 'GH',
  [TERA_HASH]: 'TH',
  [PETA_HASH]: 'PH',
  [EXA_HASH]: 'EH',
  [ZETTA_HASH]: 'ZH',
};

export const unitDividers = {
  [HASH]: BigInt(0),
  [KILO_HASH]: BigInt(1e3),
  [MEGA_HASH]: BigInt(1e6),
  [GIGA_HASH]: BigInt(1e9),
  [TERA_HASH]: BigInt(1e12),
  [PETA_HASH]: BigInt(1e15),
  [EXA_HASH]: BigInt(1e18),
  [ZETTA_HASH]: BigInt(1e21),
};

/**
 * @param {BigInt} value
 * @returns {Symbol}
 */
export function getNearestUnit(value) {
  return units.find((unit, index) => {
    return unitDividers[unit] <= value && unitDividers[units[index + 1]] > value;
  }) || ZETTA_HASH;
}

function getDivPartString(value, divider) {
  const divPartStr = value.toString();
  const dividerStr = divider.toString();
  return divPartStr.padStart(dividerStr.length - 1, '0').replace(/0+$/, '');
}

function roundTheDivPart(value, round) {
  const next = value.substring(round, round + 1);
  let result = value.substring(0, round);
  if (BigInt(next) > 4) {
    result = (BigInt(result) + BigInt(1)).toString().padStart(round, '0');
  }
  return `${result}`;
}

function splitTheIntPart(value, split, splitBy) {
  if (!split) {
    return value;
  }
  const chunkSize = splitBy ?? 3;
  return value.split('').reverse().reduce((result, digit) => {
    if ((result[0]?.length ?? chunkSize) === chunkSize) {
      return [digit, ...result];
    } else {
      result[0] = `${digit}${result[0]}`;
      return result;
    }
  }, []).join(split);
}

/**
 * @param {BigInt} value
 * @param {{
 *   unit: Symbol,
 *   round: Number,
 *   showZeroes: Boolean,
 *   split: String,
 *   splitBy: Number,
 * }} options
 * @returns {String}
 */
export function getHashRateString(value, options) {
  const { unit, round, showZeroes, split, splitBy } = options || {};
  const dividerUnit = unit || getNearestUnit(value);
  const divider = unitDividers[dividerUnit];
  const dividerSuffix = `${unitShortNames[dividerUnit]}/s`;
  const intPart = value / (divider || BigInt(1));
  const divPart = value % (divider || BigInt(1));
  const divPartStrPrepend = getDivPartString(divPart, divider);
  let result = intPart;
  if (!round) {
    const firstDivPartDigit = divPartStrPrepend[0];
    if (firstDivPartDigit > 4) {
      result += BigInt(1);
    }
  }
  result = splitTheIntPart(result.toString(), split, splitBy);
  if (round > 0) {
    let roundedDivPart = roundTheDivPart(divPartStrPrepend, round);
    if (showZeroes) {
      roundedDivPart = roundedDivPart.padEnd(round, '0');
    }
    if (showZeroes || BigInt(roundedDivPart) > 0n) {
      result += `.${roundedDivPart}`;
    }
  }
  return `${result} ${dividerSuffix}`;
}

export default getHashRateString;
