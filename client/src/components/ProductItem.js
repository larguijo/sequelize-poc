import React from 'react';

function ProductItem({ product }) {
  return (
    <li class="collection-item avatar">
      <i class="material-icons circle blue">done</i>
      <span class="title">{product.name}</span>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.Stocks.length > 0 &&
        [<p>Existencias</p>,
        product.Stocks.map(stock => <p>{`${stock.Store.name}: ${stock.quantity}`}</p>)]}
      <a href="#!" class="secondary-content"><i class="material-icons">delete</i></a>
    </li>
  )
}

export default ProductItem;