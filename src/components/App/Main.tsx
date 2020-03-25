import React, { useEffect } from 'react';
import { Router } from 'src/Router';
import { GlobalStyle } from 'src/Theme/GlobalStyles';
import { useDispatch } from 'react-redux';
import { actions } from 'src/redux/actions';

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetching technologies at the top level
    dispatch(actions.fetchTechnologies());
  }, [dispatch]);

  return (
    <div className="App">
      <GlobalStyle />
      <Router data-testid="router" />
    </div>
  );
};
