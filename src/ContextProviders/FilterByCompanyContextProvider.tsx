import React, { useState, createContext } from 'react';

export interface FilterByCompanyState {
  ITR_BE: boolean;
  ITR_NL: boolean;
  FM: boolean;
}

const initialState: FilterByCompanyState = {
  ITR_BE: true,
  ITR_NL: true,
  FM: true,
};

export const filterByCompanyContext = createContext<{
  state: FilterByCompanyState;
  toggle: (company: CompanyTypes) => void;
}>({
  state: initialState,
  toggle: () => {},
});

export const FilterByCompanyContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<FilterByCompanyState>(initialState);

  const { Provider } = filterByCompanyContext;

  const toggle = (company: CompanyTypes) =>
    setState(prevState => ({
      ...prevState,
      [company]: !prevState[company],
    }));

  return <Provider value={{ state, toggle }}>{children}</Provider>;
};
