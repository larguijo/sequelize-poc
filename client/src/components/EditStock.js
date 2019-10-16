import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { renderText } from '../utils/renderFields';
import { withRouter } from 'react-router-dom';

const EditStock = ({ history, match }) => {
  const [stores, setStores] = useState([]);
  const [product, setProduct] = useState({});
  const [error, setError] = useState();

  const renderStores = () => {
    return stores.map(({ id, name }) => (renderText({ id, label: name, type: "number" })))
  }

  const getStores = async () => {
    const storeRes = await axios.get('/api/stores');
    setStores(storeRes.data);
    const productRes = await axios.get(`/api/products/${match.params.id}`);
    setProduct(productRes.data);
  }

  const onSubmit = async (values) => {
    try {
      setError(null);
      await axios.put(`/api/products/${product.id}/stocks`, values);
      history.push('/');
    } catch (error) {
      setError(error);
    }
  }

  const onCancel = () => {
    history.push('/');
  }

  const initialValues = () => {
    let initVal = {}
    const getStock = (storeId) => {
      if (!product.Stocks) {
        return 0;
      }
      const stockForStore = product.Stocks.filter(s => s.StoreId === storeId);
      return stockForStore.length ? stockForStore[0].quantity : 0;
    };

    stores.forEach(store => {
      initVal[store.id] = getStock(store.id);
    });
    return initVal;
  }


  const validate = (values) => {
    let errors = {};

    stores.forEach(({ id }) => {
      if (!values[id] < 0) {
        errors[id] = 'Required';
      }
    });
    return errors;
  }

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <h3 className="header">Edit Stocks</h3>
      <h4> {product.name} </h4>
      {product && product.id && stores.length &&
        <Formik
          className="row"
          onSubmit={onSubmit}
          validate={validate}
          initialValues={initialValues()}>
          <Form className="col s12">
            {renderStores()}
            <button className="btn waves-effect waves-light right" type="submit" name="action">
              Submit
              <i className="material-icons right">send</i>
            </button>
            <button
              className="yellow darken-3 white-text btn-flat"
              onClick={onCancel}>Back</button>
            {error && <div className="error">{error.stack}</div>}
          </Form>
        </Formik>
      }
    </div>
  )
}

export default withRouter(EditStock);