import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { auth } from 'utils/auth';
import { technologiesLoadingStateSelector } from 'redux/selectors/technologies';

const App = styled.div`
  grid-area: main;
`;

export const Main: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { initialized, loading } = useSelector(
    technologiesLoadingStateSelector(),
  );
  useEffect(() => {
    if (!initialized && !loading && auth.isLoggedIn()) {
      dispatch(actions.fetchTechnologies());
    }
  }, [initialized, loading, dispatch]);

  return <App className="App">{children}</App>;
};
