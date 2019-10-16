import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import M from "materialize-css";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { renderText, renderSelect } from '../utils/renderFields';

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
    await axios.post('/api/products', values);
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

  const renderFields = () => {
    return FIELDS.map(field => {
      switch (field.type) {
        case "select":
          {
            return renderSelect(field);
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
        <button className="btn waves-effect waves-light right" type="submit" name="action">
          Submit
          <i className="material-icons right">send</i>
        </button>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={() => history.push('/')}>Back</button>
      </Form>
    </Formik >]
  )
}

export default withRouter(NewProduct);
