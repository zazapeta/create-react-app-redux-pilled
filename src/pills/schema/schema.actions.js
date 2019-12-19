import { createAction } from 'redux-actions';

import { addPrefixToActionTypes } from '../../redux-utils/utils';

export const ACTION_TYPES = addPrefixToActionTypes(
  {
    ADD_ENTITIES: 'ADD_ENTITIES',
  },
  'model',
);

export const addEntities = createAction(ACTION_TYPES.ADD_ENTITIES);
