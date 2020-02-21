import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';

interface Params {
  route?: string;
  path?: string;
  history?: History;
}

export function renderWithRouter(
  ui: React.FunctionComponentElement<any>,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: Params = {},
) {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>
      <Route path={path}> {children} </Route>
    </Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
