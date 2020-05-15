import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { auth } from 'utils/auth';

interface PrivateProps {
  component: React.ReactType;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateProps> = ({
  component: Component,
  ...rest
}) => (
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
