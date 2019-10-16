import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

function Products() {

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get('api/products')
      .then(res => setProducts(res.data));
    ;
  }

  const renderProducts = () => {
    return <div className="row">
      {products.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h2 className="header">List of Products</h2>
      {products.length === 0 && <div>No products</div>}
      {renderProducts()}
      <div className="fixed-action-btn">
        <Link to="/products/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  )
}

export default Products;