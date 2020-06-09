import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from 'redux/actions';
import { auth } from 'utils/auth';

export const Main: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn()) {
      dispatch(actions.fetchTechnologies());
    }
  }, [dispatch]);

  return <div className="App">{children}</div>;
};
