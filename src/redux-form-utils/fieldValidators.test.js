import {
  required,
  minLength,
  maxLength,
  withMinAlpha,
  withMinNumeric,
  withMinSpecial,
  withMinUpper,
  withMinLower,
} from './fieldValidators';

describe('Redux form validators', () => {
  it('#required', () => {
    expect(required(null)).not.toEqual(undefined);
    expect(required(undefined)).not.toEqual(undefined);
    expect(required('')).not.toEqual(undefined);
    expect(required(0)).not.toEqual(undefined);

    expect(required('Hello')).toEqual(undefined);
    expect(required(12)).toEqual(undefined);
  });

  it('#minLength', () => {
    const minLength5 = minLength(5);
    expect(minLength5('')).not.toEqual(undefined);
    expect(minLength5('a')).not.toEqual(undefined);
    expect(minLength5('ab')).not.toEqual(undefined);
    expect(minLength5('abc')).not.toEqual(undefined);
    expect(minLength5('abcd')).not.toEqual(undefined);

    expect(minLength5('abcde')).toEqual(undefined);
    expect(minLength5('abcdef')).toEqual(undefined);
  });

  it('#maxLength', () => {
    const maxLength5 = maxLength(5);
    expect(maxLength5('')).toEqual(undefined);
    expect(maxLength5('a')).toEqual(undefined);
    expect(maxLength5('ab')).toEqual(undefined);
    expect(maxLength5('abc')).toEqual(undefined);
    expect(maxLength5('abcd')).toEqual(undefined);
    expect(maxLength5('abcde')).toEqual(undefined);

    expect(maxLength5('abcdef')).not.toEqual(undefined);
    expect(maxLength5('abcdefg')).not.toEqual(undefined);
  });

  it('#withMinAlpha', () => {
    const withMinAlpha6 = withMinAlpha(6);
    expect(withMinAlpha6(null)).not.toEqual(undefined);
    expect(withMinAlpha6(undefined)).not.toEqual(undefined);
    expect(withMinAlpha6(1345)).not.toEqual(undefined);
    expect(withMinAlpha6('e123')).not.toEqual(undefined);
    expect(withMinAlpha6('AbE sd')).not.toEqual(undefined);

    expect(withMinAlpha6('hellow you')).toEqual(undefined);
    expect(withMinAlpha6('hell you')).toEqual(undefined);
  });

  it('#withMinNumeric', () => {
    const withMinNumeric2 = withMinNumeric(2);
    expect(withMinNumeric2(null)).not.toEqual(undefined);
    expect(withMinNumeric2(undefined)).not.toEqual(undefined);
    expect(withMinNumeric2('AbE sd')).not.toEqual(undefined);
    expect(withMinNumeric2('AbE 1 sd')).not.toEqual(undefined);

    expect(withMinNumeric2(1345)).toEqual(undefined);
    expect(withMinNumeric2('from 1 to 2 hey')).toEqual(undefined);
    expect(withMinNumeric2('123 AbE sd')).toEqual(undefined);
  });

  it('#withMinSpecial', () => {
    const withMinSpecial1 = withMinSpecial(1);
    expect(withMinSpecial1(null)).not.toEqual(undefined);
    expect(withMinSpecial1(undefined)).not.toEqual(undefined);
    expect(withMinSpecial1('AbEsd')).not.toEqual(undefined);
    expect(withMinSpecial1('AbE1sd')).not.toEqual(undefined);
    expect(withMinSpecial1(1345)).not.toEqual(undefined);

    expect(withMinSpecial1('hello world')).toEqual(undefined);
    expect(withMinSpecial1('sami@Jhon')).toEqual(undefined);
    expect(withMinSpecial1('##HO##')).toEqual(undefined);
  });

  it('#withMinUpper', () => {
    const withMinUpper1 = withMinUpper(1);
    expect(withMinUpper1(null)).not.toEqual(undefined);
    expect(withMinUpper1(undefined)).not.toEqual(undefined);
    expect(withMinUpper1('hellow world')).not.toEqual(undefined);
    expect(withMinUpper1(1345)).not.toEqual(undefined);

    expect(withMinUpper1('just one A ther')).toEqual(undefined);
    expect(withMinUpper1('Hey Ho!')).toEqual(undefined);
    expect(withMinUpper1('##HO##')).toEqual(undefined);
  });

  it('#withMinLower', () => {
    const withMinLower1 = withMinLower(1);
    expect(withMinLower1(null)).not.toEqual(undefined);
    expect(withMinLower1(undefined)).not.toEqual(undefined);
    expect(withMinLower1('HELLO WORLD')).not.toEqual(undefined);
    expect(withMinLower1(1345)).not.toEqual(undefined);

    expect(withMinLower1('JUST ONE lETTER')).toEqual(undefined);
    expect(withMinLower1('Hey Ho!')).toEqual(undefined);
    expect(withMinLower1('##Ho##')).toEqual(undefined);
    expect(withMinLower1('a')).toEqual(undefined);
  });
});
