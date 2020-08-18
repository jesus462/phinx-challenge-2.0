import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/index.css';

//import your own components
import Layout from "./Layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#root"));

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/
//import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();