import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { auth } from 'utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { technologiesLoadingStateSelector } from 'redux/selectors/technologies';
import { actions } from 'redux/actions';

interface PrivateProps {
  component: React.ElementType;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateProps> = ({
  component: Component,
  ...rest
}) => {
  const { initialized, loading } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!initialized && !loading && auth.isLoggedIn()) {
      dispatch(actions.fetchTechnologies());
    }
  }, [initialized, loading, dispatch]);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
