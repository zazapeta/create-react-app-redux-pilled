import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import store from '../../redux-utils/store';
import LoginForm from './auth.loginForm.container';
import Logout from './auth.logout.container';
import { login, logout } from './auth.actions';
import AuthReducer from './auth.reducer';
import User from '../../models/user.model';
import { userSelector } from './auth.selectors';

const rawUser = {
  gSesGuid: '1C318AB4B890F07F3B4D574375DD2B3C',
  gUsrId: '1166',
  gUsrGuid: 'FFA6F5223A9955085D0A8E34EF3C9D15',
  gUsrLanguage: 'fr',
  gUsrDateFormat: 'dd/MM/yyyy',
  gUsrCompanyGuid: 'TOTAL',
  gServiceEnabled: '1',
  gCompanyMode: 'GLOBAL',
  gUsrEmail: 'test7@expateotest.com',
  gMixPanelToken: '124355cd44c781292f9f9f5bce580456',
  gTypeFormRpMain_FR: 'https://expateo.typeform.com/to/kkKgJU',
  gTypeFormRpMain_EN: 'https://expateo.typeform.com/to/XADq3N',
  gUsrDepartureCountryCode: 'MX',
  gRedirectPage: 'indexin.html#/Start',
  gRememberMeEmail: 'test7@expateotest.com',
  gRememberMeId: 'FFA6F5223A9955085D0A8E34EF3C9D15',
};

describe('Auth selectors', () => {
  it('Should return User', () => {
    let state = {
      Auth: {
        user: { gUsrId: '12345', gUsrGuid: '54321', gUsrLanguage: 'fr' },
      },
    };
    expect(userSelector(state)).toEqual({
      gUsrId: '12345',
      gUsrGuid: '54321',
      gUsrLanguage: 'fr',
    });
  });
});

describe('Auth render', () => {
  const noop = () => {};
  it('Should render', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginForm onLogin={noop} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should pass a logout function', (done) => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Logout
            render={({ logout }) => {
              expect(typeof logout).toEqual('function');
              done();
              return 'noop';
            }}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Auth action - reducers', () => {
  it('LOGIN Should call pending & success', (done) => {
    let isOnPendingCalledFlag = false;
    let isOnSuccessCalledFlag = false;
    let isOnFailureCalledFlag = false;
    const loginAction = login({
      username: 'jhon',
      password: 'doe',
      onPending: () => (isOnPendingCalledFlag = true),
      onSuccess: () => (isOnSuccessCalledFlag = true),
      onFailure: () => (isOnFailureCalledFlag = true),
    });
    loginAction(store.dispatch, store.getState, {
      api: {
        auth: {
          classicLogin: () => Promise.resolve(rawUser),
        },
        mobilities: { getMobilities: () => Promise.resolve([]) },
      },
    })
      .then(() => {
        expect(isOnPendingCalledFlag).toEqual(true);
        expect(isOnSuccessCalledFlag).toEqual(true);
        expect(isOnFailureCalledFlag).toEqual(false);
        done();
      })
      .catch(done);
  });

  it('LOGIN Should call pending & failure', (done) => {
    let isOnPendingCalledFlag = false;
    let isOnSuccessCalledFlag = false;
    let isOnFailureCalledFlag = false;
    const loginAction = login({
      username: 'jhon',
      password: 'doe',
      onPending: () => (isOnPendingCalledFlag = true),
      onSuccess: () => (isOnSuccessCalledFlag = true),
      onFailure: () => (isOnFailureCalledFlag = true),
    });
    loginAction(store.dispatch, store.getState, {
      api: {
        auth: {
          classicLogin: () => Promise.reject(new Error()),
        },
      },
    })
      .then(() => {
        expect(isOnPendingCalledFlag).toEqual(true);
        expect(isOnSuccessCalledFlag).toEqual(false);
        expect(isOnFailureCalledFlag).toEqual(true);
        done();
      })
      .catch(done);
  });

  it('LOGIN:SUCCESS Should set the user', (done) => {
    const noop = () => {};
    const loginAction = login({
      username: 'jhon',
      password: 'doe',
      onPending: noop,
      onSuccess: noop,
      onFailure: noop,
    });
    AuthReducer(
      store.getState().Auth,
      loginAction(store.dispatch, store.getState, {
        api: {
          auth: {
            classicLogin: () => Promise.resolve(rawUser),
          },
          mobilities: { getMobilities: () => Promise.resolve([]) },
        },
      })
        .then(() => {
          expect(store.getState().Auth).toEqual({
            user: new User(rawUser),
            error: {
              message: '',
            },
          });
          done();
        })
        .catch(done),
    );
  });

  it('LOGIN:FAILURE Should set the error', (done) => {
    const noop = () => {};
    const loginAction = login({
      username: 'jhon',
      password: 'doe',
      onPending: noop,
      onSuccess: noop,
      onFailure: noop,
    });
    AuthReducer(
      store.getState().Auth,
      loginAction(store.dispatch, store.getState, {
        api: {
          auth: {
            classicLogin: () => Promise.reject(new Error('no way')),
          },
        },
      })
        .then(() => {
          expect(store.getState().Auth).toEqual({
            user: {},
            error: {
              message: 'no way',
            },
          });
          done();
        })
        .catch(done),
    );
  });

  it('LOGOUT: Should set reset the user and the error', () => {
    let state;
    state = AuthReducer(
      {
        user: { username: 'jhon-doe', firstname: 'doe' },
        error: {
          message: 'WAT',
        },
      },
      logout(),
    );
    expect(state).toEqual({
      user: {},
      error: {
        message: '',
      },
    });
  });
});
