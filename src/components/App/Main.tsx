import React, { useEffect } from 'react';
import { Router } from 'Router';
import { GlobalStyle } from 'Theme/GlobalStyles';
import { useDispatch } from 'react-redux';
import { actions } from 'redux/actions';

export const Main: React.FC = props => {
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
