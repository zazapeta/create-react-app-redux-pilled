import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../ui-kit';

function CustomModal({
  onClose,
  isOpen,
  isBasic,
  header,
  size,
  content,
  actions,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} basic={isBasic} size={size}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>{actions}</Modal.Actions>
    </Modal>
  );
}

CustomModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  isBasic: PropTypes.bool,
  size: PropTypes.string,
  header: PropTypes.any,
  content: PropTypes.any,
  actions: PropTypes.any,
};

CustomModal.defaultProps = {
  isOpen: false,
};

export default CustomModal;
