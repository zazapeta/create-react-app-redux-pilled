import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  showErrorAlertModal,
  showBigLoaderModal,
  destroy,
} from '../modal/modal.actions';
import t from '../../i18n';

import AuthViewForm from './auth.loginForm.view';
import { login } from './auth.actions';

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin({ email, password }) {
    const { dispatch, onLogin } = this.props;
    const destroyModal = () => dispatch(destroy());
    dispatch(
      login({
        email,
        password,
        onPending: () =>
          dispatch(showBigLoaderModal({ content: t('modals.login_pending') })),
        onSuccess: (user) => {
          destroyModal();
          onLogin(user);
        },
        onFailure: () => {
          dispatch(
            showErrorAlertModal(
              {
                title: t('modals.login_error_title'),
                message: t('modals.login_error_message'),
                onClose: () => dispatch(destroy()),
              },
              dispatch,
            ),
          );
        },
      }),
    );
  }

  render() {
    return <AuthViewForm onSubmit={this.handleLogin} />;
  }
}

AuthContainer.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default connect(null)(AuthContainer);
