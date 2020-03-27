import React, { ReactNode } from 'react';
import { Route, MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components/macro';
import { lightTheme } from 'Theme';
import { Provider } from 'react-redux';
import { rootStateBuilder, storeCreator } from 'test/builders';
import { IRootState, defaultRootState, rootReducer } from 'redux/reducers';
import { MockStore } from '@jedmao/redux-mock-store';

const defaultStore = storeCreator(rootStateBuilder());

interface Params {
  route?: string;
  path?: string;
  history?: History;
  store?: MockStore<IRootState>;
}

// #region react-testing-library
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
    store = storeCreator(rootStateBuilder()),
  }: Params = {},
  theme = lightTheme,
  ...options: any
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[route]}>
          {/* <Route path={route}>{children}</Route> */}
          <Route path={path}>{children}</Route>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
};
// #endregion react-testing-library

// #region Enzyme
export const AllProvidersWrapper = ({
  children,
  path = '/',
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
  store = storeCreator(rootStateBuilder()),
}: {
  children: ReactNode;
  path: string;
  route: string;
  history: History;
  store: MockStore<IRootState>;
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <Router history={history}>
          <Route path={path}>{children}</Route>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export const getSelector = (id: string) => ({
  'data-testid': id,
});
// #endregion Enzyme
