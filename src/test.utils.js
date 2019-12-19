import React from 'react';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import reducers from './redux-utils/reducers';

export const renderWithStore = (state) => (Component, props = {}) => {
  const store = createStore(reducers, state);

  const instance = render(
    <Provider store={store}>
      <Component {...props} />
    </Provider>,
  );

  return instance;
};
