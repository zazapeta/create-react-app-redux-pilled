import React from 'react';
import { shallow } from 'enzyme';

import store from '../../redux-utils/store';

import Modal from './modal.container';
import { show, hide, destroy } from './modal.actions';
import ModalReducer from './modal.reducer';

describe('Modal render', () => {
  it('Should render', () => {
    expect(shallow(<Modal />)).toBeDefined();
  });
});

describe('Modal action - reducers', () => {
  it('SHOW: Should set isOpen to true', () => {
    let state;
    state = ModalReducer(
      { isOpen: false, header: '', content: '', actions: '' },
      show(),
    );
    expect(state).toEqual({
      isOpen: true,
      header: '',
      content: '',
      actions: '',
    });
  });

  it('HIDE: Should set isOpen to false and keep content', () => {
    let state;
    state = ModalReducer(
      { isOpen: true, header: 'a', content: 'b', actions: 'c' },
      hide(),
    );
    expect(state).toEqual({
      isOpen: false,
      header: 'a',
      content: 'b',
      actions: 'c',
    });
  });

  it('DESTROY: Should reset the modal state', () => {
    let state;
    state = ModalReducer(
      { isOpen: true, header: 'a', content: 'b', actions: 'c', other: 'd' },
      destroy(),
    );
    expect(state).toEqual({
      isOpen: false,
      header: '',
      content: '',
      actions: '',
    });
  });
});
