import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import M from "materialize-css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const FIELDS = [{
  id: "name", required: true, label: "Product Name", type: "text"
},
{
  id: "description", required: true, label: "Description", type: "text"
},
{
  id: "price", required: true, label: "Price", type: "number"
},
{
  id: "status", required: true, label: "Status", type: "select", options: [{ label: "ACTIVE", value: "ACTIVE" }, { label: "DISCONTINUED", value: "DISCONTINUED" }]
}];

function NewProduct({ history }) {
  useEffect(() => {
    let selects = document.querySelectorAll('select');
    M.FormSelect.init(selects, {});
    M.updateTextFields();
  },
    []);

  const onSubmit = async (values) => {
    const res = await axios.post('/api/products', values);
    history.push('/');
  }

  const validate = (values) => {
    let errors = {};
    FIELDS.forEach(({ required, id }) => {
      if (required && !values[id]) {
        errors[id] = 'Required';
      }
    });
    return errors;
  }

  const renderText = ({ id, label, name, type }) => {
    return <div key={id} className="row">
      <div className="input-field col s12">
        <Field type={type} name={id} />
        <label htmlFor={id}>{label}</label>
        <ErrorMessage className="invalid" name={id} component="div" />
      </div>
    </div>
  }

  const renderSelect = ({ id, label, name, type, options }) => {
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

  const renderFields = () => {
    return FIELDS.map(field => {
      switch (field.type) {
        case "select":
          {
            return renderSelect(field);
            break;
          }
        default:
          return renderText(field);
      }
    })
  }

  return (
    [<h3 key="1" className="header">New Product</h3>,
    <Formik key="2" className="row" onSubmit={onSubmit} validate={validate}>
      <Form className="col s12">
        {renderFields()}
        <button className="btn waves-effect waves-light" type="submit" name="action">
          Submit
          <i className="material-icons right">send</i>
        </button>
      </Form>
    </Formik>]
  )
}

export default withRouter(NewProduct);
