import React from 'react';
import ReactDOM from 'react-dom';

import "../styles/index.scss";

//import your own components
import Layout from "./Layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#root"));

//import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
