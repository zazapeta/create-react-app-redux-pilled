import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import View from './p.view';

class P extends Component {
  render() {
    return <View {...this.props} />;
  }
}

function mapStateToProps(store) {
  return {};
}

P.propTypes = {};

export default connect(mapStateToProps)(P);
