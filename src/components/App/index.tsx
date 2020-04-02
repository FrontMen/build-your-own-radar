import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { lightTheme } from 'Theme';
import { store } from 'redux/store';
import { Main } from './Main';

export const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <Main />
    </ThemeProvider>
  </Provider>
);
