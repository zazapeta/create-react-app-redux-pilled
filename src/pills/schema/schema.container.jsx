import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function SchemaContainer({ mapStateToProps, render: R, ...rest }) {
  return <R {...rest} />;
}

function msp(store, { mapStateToProps, ...props }) {
  return mapStateToProps(store, props);
}

SchemaContainer.propTypes = {
  /**
   * mapStateToProps(store, props) (as described into react-redux)
   */
  mapStateToProps: PropTypes.func.isRequired,
  /**
   * render component/function - extra props are passed down without the mapStateToProps
   */
  render: PropTypes.func.isRequired,
};

export default connect(msp)(SchemaContainer);
