import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import { I18nextProvider } from 'react-i18next';
import { lightTheme } from 'Theme';
import { store } from 'redux/store';
import i18n from 'i18n';
import { Main } from './Main';

export const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <I18nextProvider i18n={i18n}>
        <Main />
      </I18nextProvider>
    </ThemeProvider>
  </Provider>
);
