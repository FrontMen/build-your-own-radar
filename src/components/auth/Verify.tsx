import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory, Redirect } from 'react-router-dom';
import { HomePageSkeleton } from 'components/Skeleton/Homepage';
import { authActions } from 'redux/actions/auth';
import { authStateSelector } from 'redux/selectors/auth';

export const Verify: React.FC<RouteComponentProps> = props => {
  const { location, match } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { authorized, error } = useSelector(authStateSelector);

  useEffect(() => {
    if (location.search) {
      dispatch(
        authActions.fetchToken({
          params: match.params,
          search: location.search.substr(1),
        }),
      );
      history.replace({
        search: '',
      });
    }
    if (error) {
      history.replace({
        pathname: '/auth/login',
        state: { error },
      });
    }
  }, [dispatch, location.search, match.params, error, history]);

  if (authorized) {
    return <Redirect to="/" />;
  }

  return <HomePageSkeleton />;
};
