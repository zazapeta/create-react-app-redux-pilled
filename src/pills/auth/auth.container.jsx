import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import User from '../../models/user.model';

import { userSelector } from './auth.selectors';

const AuthContainer = ({ render, ...props }) => render(props);

function mapStateToProps(store) {
  return {
    user: userSelector(store),
  };
}

AuthContainer.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  render: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AuthContainer);
