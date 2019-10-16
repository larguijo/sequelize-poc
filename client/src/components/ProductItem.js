import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <div className="col s12 m6">
      <div class="card blue-grey white-text">
        <div class="card-content">
          <span class="title">{product.name}</span>
          <p>{product.description}</p>
          <p>${product.price}</p>
          {product.Stocks.length > 0 &&
            [<p>Stock by Store</p>,
            product.Stocks.map(stock => <p>{`${stock.Store.name}: ${stock.quantity}`}</p>)]}
        </div>
        <div className="card-action white-text">
          <Link to={`/products/${product.id}/stocks`}>Modify Stock</Link>
          <a href="#!">Discontinue</a>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;