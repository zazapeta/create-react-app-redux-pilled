import React from 'react';

export function Checkbox({ input: { value, onChange }, ...rest }) {
  return <input type="checkbox" />;
  // return (
  //   <Form.Field
  //     control={SCheckbox}
  //     checked={Boolean(value)}
  //     onChange={(_, { checked }) => onChange(checked)}
  //     {...rest}
  //   />
  // );
}
