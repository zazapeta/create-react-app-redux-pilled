import { ACTION_TYPES as SchemaActionTypes } from './schema.actions';

const initialState = {
  entities: {},
};

export default function schemaReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SchemaActionTypes.ADD_ENTITIES:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
