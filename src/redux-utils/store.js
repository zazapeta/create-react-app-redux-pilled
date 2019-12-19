import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';

import reducers from './reducers';
import { loadState, saveState } from './localState';

const middlewares = [thunk.withExtraArgument({})];

// ---------------------------------------------------------------------
let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  const { isFSA } = require('flux-standard-action');
  const reduxImmutable = require('redux-immutable-state-invariant');
  const logger = require('redux-logger');
  const fsaChecker = (store) => (next) => (action) => {
    if (isFSA(action)) {
      return next(action);
    } else {
      console.error('Dispatching a non FSA action => ', action);
      throw new Error(
        `Dispatching a non FSA action => ${JSON.stringify(action)}`,
      );
    }
  };
  middlewares.push(fsaChecker);
  middlewares.push(logger).push(reduxImmutable);
  composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}
// ---------------------------------------------------------------------
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState /* INITIAL STATE */,
  composeEnhancers(applyMiddleware(...middlewares)),
);

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;
