import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { auth } from 'utils/auth';
import { technologiesLoadingStateSelector } from 'redux/selectors/technologies';

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

  return <div className="App">{children}</div>;
};
