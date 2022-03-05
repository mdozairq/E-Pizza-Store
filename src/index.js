import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PizzaStoreProvider} from './context/Context'

ReactDOM.render(
  <>
    <PizzaStoreProvider>
      <App />
    </PizzaStoreProvider>
  </>,
  document.getElementById('root')
);
