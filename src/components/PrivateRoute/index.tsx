import React from 'react';
import { Redirect, Route } from 'react-router-dom';

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
      false ? (
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
