import React, { ReactNode } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components/macro';
import { lightTheme } from '../src/Theme';

interface Params {
  route?: string;
  path?: string;
  history?: History;
}

export const renderWithRouter = (
  ui: React.ReactElement,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: Params = {},
) => {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>
      <Route path={path}> {children} </Route>
    </Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

export const withThemeProviders = (ui: React.ReactElement, options?: any) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
  );
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
};

export const withAllProviders = (
  ui: React.ReactElement,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: Params = {},
  theme = lightTheme,
  ...options: any
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Route path={path}>{children}</Route>
      </Router>
    </ThemeProvider>
  );
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
};
