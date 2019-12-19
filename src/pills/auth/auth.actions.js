import { createAction } from 'redux-actions';

import { addPrefixToActionTypes } from '../../redux-utils/utils';
import User from '../../models/user.model';

import { getMobilities } from '../mobilities/mobilities.actions';

export const ACTION_TYPES = addPrefixToActionTypes(
  {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
  },
  'auth',
);

export const loginSuccess = createAction(ACTION_TYPES.LOGIN_SUCCESS);
export const loginFailure = createAction(ACTION_TYPES.LOGIN_FAILURE);
export const logout = createAction(ACTION_TYPES.LOGOUT);

export function login({ email, password, onPending, onSuccess, onFailure }) {
  onPending();
  return async (dispatch, getState, { api }) => {
    try {
      const rawUser = await api.auth.classicLogin({ email, password });
      const user = new User(rawUser);
      dispatch(loginSuccess(user));
      await dispatch(getMobilities()); // when the user login, we should fetch the mobilities as it is a part of the login process
      onSuccess(user);
    } catch (e) {
      dispatch(loginFailure(e));
      onFailure(e);
    }
  };
}
