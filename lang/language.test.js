const lang = require('./language');

describe('getPhrase function', () => {
  test('empty phrase', () => {
    expect(lang.getPhrase('')).toBe(lang.errorMessage);
  });
  test('number as a phrase', () => {
    expect(lang.getPhrase(123)).toBe(lang.errorMessage);
    expect(lang.getPhrase(0)).toBe(lang.errorMessage);
    expect(lang.getPhrase(300)).toBe(lang.errorMessage);
  });
  test('boolean as a phrase', () => {
    expect(lang.getPhrase(false)).toBe(lang.errorMessage);
    expect(lang.getPhrase(true)).toBe(lang.errorMessage);
  });
  test('custom error message', () => {
    const errorMessage = { message: 'error happened' };
    expect(lang.getPhrase(false, errorMessage)).toBe(errorMessage);
  });
});
