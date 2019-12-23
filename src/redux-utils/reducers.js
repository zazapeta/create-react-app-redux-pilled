import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  // default reducer to avoid redux warning
  form: formReducer,
  app: (state = {}, action) => {
    return state;
  },
});
