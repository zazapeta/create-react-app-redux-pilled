import { createAction } from 'redux-actions';

import { addPrefixToActionTypes } from '../../redux-utils/utils';

import {
  BigLoaderModal,
  ErrorModal,
  ConfirmModal,
  ErrorAlertModal,
} from './modal.loaders';

// TODO: test that functions

export const ACTION_TYPES = addPrefixToActionTypes(
  {
    SHOW: 'SHOW',
    HIDE: 'HIDE', // hide modal but preserve it content
    DESTROY: 'DESTROY', // HIDE + reset of content
  },
  'modal',
);

export const show = createAction(ACTION_TYPES.SHOW);
export const hide = createAction(ACTION_TYPES.HIDE);
export const destroy = createAction(ACTION_TYPES.DESTROY);

export const showBigLoaderModal = ({ content, ...rest }) =>
  show(
    BigLoaderModal({
      content,
      ...rest,
    }),
  );

export const showErrorModal = ({ title, message, ...rest }) =>
  show(
    ErrorModal({
      title,
      message,
      ...rest,
    }),
  );

export const showErrorAlertModal = (
  { title, message, onClose, ...rest },
  dispatch,
) =>
  show(
    ErrorAlertModal({
      title,
      message,
      onClose: async () => {
        await onClose();
        dispatch(destroy());
      },
      ...rest,
    }),
  );

export const showConfirmationModal = (
  { title, message, onClose, ...rest },
  dispatch,
) =>
  show(
    ErrorAlertModal({
      title,
      message,
      onClose: async () => {
        await onClose();
        dispatch(destroy());
      },
      ...rest,
    }),
  );

export const showConfirmModal = (
  { title, message, onYes, onNo, ...rest },
  dispatch,
) =>
  show(
    ConfirmModal({
      title,
      message,
      onYes: async () => {
        await onYes();
        dispatch(destroy());
      },
      onNo: async () => {
        await onNo();
        dispatch(destroy());
      },
      ...rest,
    }),
  );
