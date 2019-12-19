import { combineReducers } from 'redux';

export default combineReducers({
  // default reducer to avoid redux warning
  app: (state = {}, action) => {
    return state;
  },
});
