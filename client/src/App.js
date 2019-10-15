import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Products from './components/Products';
import NewProduct from './components/NewProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route exact path="/" component={Products} />
        <Route path="/products/new" component={NewProduct} />
      </div>
    </BrowserRouter>
  );
}

export default App;
