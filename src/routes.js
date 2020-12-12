import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Painel from './pages/Painel';
import Register from './pages/Register';
import Users from './pages/Users';
import Ficha from './pages/Ficha';
import Encaminhamentos from './pages/Encaminhamentos';
import Relatorio1 from './pages/Relatorio1';
import Relatorio2 from './pages/Relatorio2';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/painel" component={Painel} />
        <Route path="/register" component={Register} />
        <Route path="/ficha/:users" component={Ficha} />
        <Route path="/users/" component={Users} />
        {/* Rotas para relatório */}
        <Route path="/relat1/" component={Relatorio1} />
        <Route path="/relat2/" component={Relatorio2} />
        <Route path="/encaminhamentos" component={Encaminhamentos} />
      </Switch>
    </BrowserRouter>
  );
}
