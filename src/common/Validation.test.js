import Validation from './Validation';

describe('Validation tests', () => {
  it('can validate Invalid strings', () => {
    expect(Validation.isStringValid(null)).toEqual(false);
    expect(Validation.isStringValid(undefined)).toEqual(false);
    expect(Validation.isStringValid(' ')).toEqual(false);
  });

  it('can validate Valid strings', () => {
    expect(Validation.isStringValid('abc')).toEqual(true);
    expect(Validation.isStringValid('hi world')).toEqual(true);
  });
});
