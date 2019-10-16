import React from 'react';
import { Field, ErrorMessage } from 'formik';

export const renderText = ({ id, label, name, type }) => {
  return <div key={id} className="row">
    <div className="input-field col s12">
      <Field type={type} name={id} />
      <label htmlFor={id}>{label}</label>
      <ErrorMessage className="invalid" name={id} component="div" />
    </div>
  </div>
}

export const renderSelect = ({ id, label, name, type, options }) => {
  return (
    <div key={id} className="row">
      <div className="input-field col s12">
        <Field component="select" defaultValue="" name={id}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          <option disabled value="">Choose your option</option>
        </Field>
        <label>{label}</label>
      </div >
    </div>
  );
}