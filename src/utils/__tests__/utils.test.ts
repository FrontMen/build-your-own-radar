import { dateFormat } from '../';

describe('Utils', () => {
  it('Should convert a valid date to month, year format', () => {
    expect(dateFormat(null)).toBe('');
    expect(dateFormat('')).toBe('');
    expect(dateFormat('foo')).toBe('');

    expect(dateFormat('2020-01')).toBe('Jan, 2020');
    expect(dateFormat('2020-02')).toBe('Feb, 2020');
    expect(dateFormat('2020-06')).toBe('Jun, 2020');
  });
});
