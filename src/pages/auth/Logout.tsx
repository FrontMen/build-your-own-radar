import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../utils/auth';

export const Logout: React.FC = () => {
  useEffect(() => {
    auth.logout();
  }, []);

  return (
    <Redirect
      to={{
        pathname: '/auth/login',
      }}
    />
  );
};
