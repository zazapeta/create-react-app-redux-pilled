import { addPrefixToActionTypes } from './utils';

it('Should addPrefixToActionTypes ', () => {
  const actionTypes = {
    TEST1: 'TEST1',
    TEST2: 'TEST2',
    TEST3: 'TEST3',
  };
  const domain = 'APP';

  expect(addPrefixToActionTypes(actionTypes, domain)).toEqual({
    TEST1: '@APP/TEST1',
    TEST2: '@APP/TEST2',
    TEST3: '@APP/TEST3',
  });
});
