import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import {Main} from "./components/Main";
import {FootNote} from "./components/FootNote";

ReactDOM.render(
  <React.StrictMode>
    <div className="app-container">
      <Main />
      <FootNote />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
