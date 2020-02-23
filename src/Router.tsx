import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { Details } from './components/Details';
import styled from 'styled-components';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/details/:id">
        <Details />
      </Route>
    </Switch>
  </BrowserRouter>
);
