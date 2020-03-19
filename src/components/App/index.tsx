import React from 'react';
import { Router } from 'src/Router';
import { ThemeProvider } from 'styled-components/macro';
import { GlobalStyle } from 'src/Theme/GlobalStyles';
import { lightTheme } from 'src/Theme';
import { FilterByCompanyContextProvider } from 'src/ContextProviders/FilterByCompanyContextProvider';
import { GoogleSheetsContextProvider } from 'src/ContextProviders/GoogleSheetsContextProvider';

export const App: React.FC = () => (
  <ThemeProvider theme={lightTheme}>
    <GoogleSheetsContextProvider>
      <FilterByCompanyContextProvider>
        <div className="App">
          <GlobalStyle />
          <Router data-testid="router" />
        </div>
      </FilterByCompanyContextProvider>
    </GoogleSheetsContextProvider>
  </ThemeProvider>
);
