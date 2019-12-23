import React from 'react';
import get from 'lodash.get';

const texts = {
  pills: {},
  form: {},
  pages: {},
  buttons: {},
  modals: {},
  menu: {},
};

const TError = ({ text }) => (
  <div style={{ color: 'red', border: '1px solid gray', background: 'black' }}>
    i18n error: {text} doesn't exist
  </div>
);

const t = (texts) => (key) => {
  let value = get(texts, key);
  return typeof value === 'string' ? value : <TError text={key} />;
};

export default t(texts);
