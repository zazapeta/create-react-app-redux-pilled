import { ACTION_TYPES as AuthActionTypes } from './auth.actions';

const initialState = {
  user: {},
  error: {
    message: '',
  },
};

export default function AuthReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: {
          message: '',
        },
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: {},
        error: {
          message: action.payload && action.payload.message,
        },
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        error: {
          message: '',
        },
      };
    default:
      return state;
  }
}
