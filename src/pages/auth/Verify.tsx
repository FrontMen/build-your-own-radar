import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HomePageSkeleton } from 'components/Skeleton/Homepage';
import { RouteComponentProps } from 'react-router-dom';
import { authActions } from 'redux/actions/auth';

export const Verify: React.FC<RouteComponentProps> = props => {
  const { location, match } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authActions.fetchToken({ params: match.params, search: location.search }),
    );
  }, [dispatch, location.search, match.params]);

  return <HomePageSkeleton />;
};
