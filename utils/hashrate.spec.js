import {
  getHashRateString,
  KILO_HASH,
  MEGA_HASH,
  GIGA_HASH,
} from './hashrate';

describe('utils:hashRate', () => {
  it('should return correct hash rate string by default', () => {
    expect(getHashRateString(0n)).toEqual('0 H/s');
    expect(getHashRateString(10n)).toEqual('10 H/s');
    expect(getHashRateString(999n)).toEqual('999 H/s');
    expect(getHashRateString(1000n)).toEqual('1 KH/s');
    expect(getHashRateString(999999n)).toEqual('1000 KH/s');
    expect(getHashRateString(345634564855460n)).toEqual('346 TH/s');
    expect(getHashRateString(45345634564855460n)).toEqual('45 PH/s');
    expect(getHashRateString(454545345634564855460n)).toEqual('455 EH/s');
    expect(getHashRateString(123854545345634564855460n)).toEqual('124 ZH/s');
  });

  it('should round hash rate', () => {
    expect(getHashRateString(1010n, {
      unit: KILO_HASH,
      round: 2,
    })).toEqual('1.01 KH/s');

    expect(getHashRateString(1010n, {
      unit: KILO_HASH,
      round: 5,
    })).toEqual('1.01 KH/s');

    expect(getHashRateString(1010n, {
      unit: KILO_HASH,
      round: 5,
      showZeroes: true,
    })).toEqual('1.01000 KH/s');

    expect(getHashRateString(499n, {
      unit: MEGA_HASH,
      round: 3,
    })).toEqual('0 MH/s');

    expect(getHashRateString(499n, {
      unit: MEGA_HASH,
      round: 3,
      showZeroes: true,
    })).toEqual('0.000 MH/s');

    expect(getHashRateString(999n, {
      unit: MEGA_HASH,
      round: 3,
    })).toEqual('0.001 MH/s');

    expect(getHashRateString(1000n, {
      unit: MEGA_HASH,
      round: 3,
    })).toEqual('0.001 MH/s');

    expect(getHashRateString(1024355460n, {
      unit: MEGA_HASH,
      round: 2,
    })).toEqual('1024.36 MH/s');

    expect(getHashRateString(1024355460n, {
      unit: MEGA_HASH,
      round: 2,
    })).toEqual('1024.36 MH/s');
  });

  it('should split hash rate integer part', () => {
    expect(getHashRateString(345634564855460n, {
      unit: MEGA_HASH,
      round: 2,
      split: ',',
    })).toEqual('345,634,564.86 MH/s');

    expect(getHashRateString(5634564855460n, {
      unit: GIGA_HASH,
      round: 2,
      split: ' ',
    })).toEqual('5 634.56 GH/s');
  });
});
