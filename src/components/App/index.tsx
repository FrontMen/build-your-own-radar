import React from 'react';
import { Router } from 'src/Router';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from 'src/Theme/GlobalStyles';
import { lightTheme } from 'src/Theme';

export const App: React.FC = () => (
  <ThemeProvider theme={lightTheme}>
    <div className="App">
      <GlobalStyle />
      <Router data-testid="router" />
    </div>
  </ThemeProvider>
);
