jest.mock('src/ContextProviders/GoogleSheetsContextProvider', () => {
  const React = require('react');
  const { parsedMockData: data } = require('test/mockData') ;

  const googleSheetsContext = React.createContext({ data });

  const GoogleSheetsContextProvider: React.FC = ({ children }) => {
    const { Provider } = googleSheetsContext;
    return <Provider value={{ data }}>{children}</Provider>;
  };
  return {
    googleSheetsContext,
    GoogleSheetsContextProvider,
  };
});


export {};
