import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { Details } from './components/Details';
import { Quadrant } from './components/Quadrant';
import { PageGrid } from './components/shared/PageGrid';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const Router: React.FC = () => (
  <BrowserRouter>
    <PageGrid>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:quadrant/:technology">
          <Details />
        </Route>
        <Route path="/:quadrant">
          <Quadrant />
        </Route>
      </Switch>
      <Footer />
    </PageGrid>
  </BrowserRouter>
);
