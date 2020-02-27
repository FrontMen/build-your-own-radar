import React from 'react';
import { Router } from '../../Router';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from '../../Theme/GlobalStyles';
import { lightTheme } from '../../Theme';

export const App: React.FC = () => (
  <ThemeProvider theme={lightTheme}>
    <div className="App">
      <GlobalStyle />
      <Router data-testid="router" />
    </div>
  </ThemeProvider>
);
