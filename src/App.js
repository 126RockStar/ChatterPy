// @flow
import './assets/scss/style.scss';
import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import ChatterPyApp from './components/ChatterPyApp';
import Website from './components/Website';
import { history } from './helpers/history';

export default function App(): React.Element<typeof Router> {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/app">
          <ChatterPyApp />
        </Route>
        <Route path="/">
          <Website />
        </Route>
      </Switch>
    </Router>
  );
}
