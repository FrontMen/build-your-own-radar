import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from 'components/Home';
import { Details } from 'components/Details';
import { Quadrant } from 'components/Quadrant';
import { PageGrid } from 'components/shared/PageGrid';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { NotFound } from 'components/NotFound';
import { ScrollToTop } from 'hooks/topScroll';

export const Router: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <PageGrid>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/not-found">
          <NotFound />
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
