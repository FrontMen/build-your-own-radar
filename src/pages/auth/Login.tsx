import React from 'react';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import googleSvg from 'res/svg/google.svg';

const Content = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 416px;
  padding: 33px 0px;
  border: 1px solid #f3f3f3;
  border-top: 2px solid #1c5de7;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  text-align: center;
`;

const LoginTitle = styled.h1`
  font-family: Montserrat, san-serif;
  font-weight: 700;
  font-size: 1.5em;
`;

const GoogleButton = styled.a`
  font-size: 1em;
  display: inline-block;
  font-family: Montserrat, san-serif;
  width: 90%;
  border: 1px solid #a0a0a0;
  border-radius: 6px;
  padding: 8px 0;
  background-image: url(${googleSvg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: 30%;
  cursor: pointer;
  text-decoration: none;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const Login: React.FC = () => (
  <MainContentSlot>
    <Content>
      <LoginBox>
        <LoginTitle>Login</LoginTitle>
        <GoogleButton
          href={`${process.env.REACT_APP_BACKEND_URL}/connect/google`}
        >
          Google
        </GoogleButton>
      </LoginBox>
    </Content>
  </MainContentSlot>
);
