import React from 'react';
import { connect } from 'react-redux';

import ModalView from './modal.view';
import { destroy } from './modal.actions';

function Modal({ dispatch, ...rest }) {
  return <ModalView onClose={() => dispatch(destroy())} {...rest} />;
}

function mapStateToProps({ Modal }) {
  return Modal;
}

export default connect(mapStateToProps)(Modal);
