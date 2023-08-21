/** Application setup */
import './setup';

/** React imports */
import React from 'react';
import ReactDOM from 'react-dom';

/** Routes */
import Router from './routes';

/** Main renderer */
ReactDOM.render(
  <React.StrictMode>{Router}</React.StrictMode>,
  document.getElementById('root')
);
