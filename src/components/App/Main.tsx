import React, { useEffect } from 'react';
import { Router } from 'Router';
import { parse } from 'query-string';
import { GlobalStyle } from 'Theme/GlobalStyles';
import { useDispatch } from 'react-redux';
import { actions } from 'redux/actions';
import { auth } from 'utils/auth';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const currentToken = auth.getToken();
  const { access_token } = parse(window.location.search);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      dispatch(actions.fetchTechnologies());
    }
  }, [dispatch]);
  if (access_token && access_token !== currentToken) {
    // New Token
    auth.setToken(access_token);
  }

  return (
    <div className="App">
      <GlobalStyle />
      <Router data-testid="router" />
    </div>
  );
};
