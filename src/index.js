import 'jquery-ui-dist/jquery-ui.min';

import React from 'react';
import ReactDOM from 'react-dom';
import objectFitFallback from './modules/object-fit';
import dropdownFunctions from './modules/dropdown';
import navTriggerFunctions from './modules/nav-trigger';
import tabsFunctions from './modules/tabsfunctions';
import popupFunctions from './modules/popup-functions';
import infoFunctions from './modules/info-functions';
import jqueryUiFunctions from './modules/jqueryui-functions';
import addElement from './modules/add-element-function';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

(function (window, document, $) {
  // Your includes goes here...

  /*
   * Object Fit IE11 fallback init.
   */
  objectFitFallback();

  // only load dropdown functionality through here if the react app isn't
  // loaded. If a react app is loaded then we'll just use the dropdowns
  // through our React components.
  //dropdownFunctions();
  if (!document.getElementById('root')) {
    dropdownFunctions();
  }

  navTriggerFunctions();
  tabsFunctions();
  popupFunctions();
  jqueryUiFunctions();
  infoFunctions();
  addElement();
})(window, document, window.jQuery);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
