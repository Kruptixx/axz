const lang = require('./language');

describe('getPhrase function', () => {
  test('empty phrase', () => {
    expect(lang.getPhrase('', 'en')).toBe(lang.errorMessage);
  });
  test('number as a phrase', () => {
    expect(lang.getPhrase(123, 'ru')).toBe(lang.errorMessage);
    expect(lang.getPhrase(0, 'en')).toBe(lang.errorMessage);
    expect(lang.getPhrase(300, 'en')).toBe(lang.errorMessage);
  });
  test('boolean as a phrase', () => {
    expect(lang.getPhrase(false, 'en')).toBe(lang.errorMessage);
    expect(lang.getPhrase(true, 'ru')).toBe(lang.errorMessage);
  });
});
