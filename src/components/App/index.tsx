import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from 'Theme/GlobalStyles';
import { I18nextProvider } from 'react-i18next';
import { lightTheme } from 'Theme';
import { store } from 'redux/store';
import i18n from 'i18n';
import { Router } from 'Router';
import { client } from 'utils/apolloClient';

export const App: React.FC = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <I18nextProvider i18n={i18n}>
          <GlobalStyle />
          <Router data-testid="router" />
        </I18nextProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);
