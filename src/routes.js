import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Painel from './pages/Painel';
import Register from './pages/Register';
import Users from './pages/Users';
import Encaminhamentos from './pages/Encaminhamentos';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/painel" component={Painel} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={Users} />
        <Route path="/encaminhamentos" component={Encaminhamentos} />
      </Switch>
    </BrowserRouter>
  );
}
