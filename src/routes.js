import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';

import Painel from './pages/Painel';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/painel" component={Painel} />
      </Switch>
    </BrowserRouter>
  );
}
