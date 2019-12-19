import React from 'react';
import { renderWithStore } from './test.utils';
import App from './App';
import store from './redux-utils/store';

test('renders learn react link', () => {
  const { getByText } = renderWithStore(store.getState())(App);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
