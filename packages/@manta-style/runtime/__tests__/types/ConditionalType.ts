import MS from '../../src';

describe('ConditionalType', () => {
  test('1 extends number ? true : false / "haha" extends number ? true : false', () => {
    const literalOne = MS.Literal(1);
    const literalHaha = MS.Literal('haha');
    const literalTrue = MS.Literal(true);
    const literalFalse = MS.Literal(false);
    const conditionNumber = MS.ConditionalType(
      literalOne,
      MS.NumberKeyword,
      literalTrue,
      literalFalse,
    );
    const conditionString = MS.ConditionalType(
      literalHaha,
      MS.NumberKeyword,
      literalTrue,
      literalFalse,
    );
    const expectedTypeNumber = conditionNumber.deriveLiteral();
    const expectedTypeString = conditionString.deriveLiteral();
    expect(expectedTypeNumber).toBe(literalTrue);
    expect(expectedTypeString).toBe(literalFalse);
  });
});
