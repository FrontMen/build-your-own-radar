import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
);
