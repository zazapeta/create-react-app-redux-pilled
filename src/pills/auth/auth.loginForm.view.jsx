import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { Button, Form } from '../../ui-kit';
import { Input } from '../../redux-form-utils/fieldComponents';
import t from '../../i18n';
import { required } from '../../redux-form-utils/fieldValidators';

function AuthView({ handleSubmit, invalid }) {
  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Field
        name="email"
        component={Input}
        icon="user"
        iconPosition="left"
        placeholder="Email"
        validate={required}
        autoFocus
        fluid
      />
      <Field
        name="password"
        type="password"
        component={Input}
        icon="lock"
        iconPosition="left"
        placeholder={t('form.fields.password.label')}
        validate={required}
        fluid
      />
      <Button primary type="submit" fluid size="large" disabled={invalid}>
        {t('form.submit.login')}
      </Button>
    </Form>
  );
}

AuthView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'AuthForm',
})(AuthView);
