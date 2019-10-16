import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import EditStock from './components/EditStock';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route exact path="/" component={Products} />
        <Route path="/products/new" component={NewProduct} />
        <Route path="/products/:id/stocks" component={EditStock} />
      </div>
    </BrowserRouter>
  );
}

export default App;
