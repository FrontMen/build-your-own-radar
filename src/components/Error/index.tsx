import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { MainContentSlot } from 'components/shared/PageSlots';
import { auth } from 'utils/auth';

const Content = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

export interface IError {
  message: string;
}

export const Error: React.FC<IError> = ({ message }) => {
  const history = useHistory();
  if (message.includes('token') || !auth.isLoggedIn()) {
    auth.logout();
    history.push('/auth/login');
    return null;
  }
  return (
    <MainContentSlot>
      <Content data-testid="home-error">
        <div>
          <h1>500</h1>
          <h2>Oops! Looks like the server is not responding</h2>
          <h3>{message}</h3>
        </div>
      </Content>
    </MainContentSlot>
  );
};
