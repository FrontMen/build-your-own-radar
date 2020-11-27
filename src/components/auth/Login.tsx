import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { MainContentSlot } from 'components/shared/PageSlots';
import { Text } from 'components/Text';
import googleSvg from 'res/svg/google.svg';
import microsoftSvg from 'res/svg/microsoft.svg';
import cross from 'res/svg/cross.svg';

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

const SocialButton = styled.a`
  font-size: 1em;
  display: inline-block;
  font-family: Montserrat, san-serif;
  width: 90%;
  border: 1px solid #a0a0a0;
  border-radius: 6px;
  background-repeat: no-repeat;
  background-size: 32px;
  background-position-x: 30%;
  background-position-y: center;
  line-height:44px;
  cursor: pointer;
  text-decoration: none;
  opacity: 0.8;
  margin: 0 auto 8px;

  &:hover {
    opacity: 1;
  }
`;

const GoogleButton = styled(SocialButton)`
  background-image: url(${googleSvg});
`;

const MicrosoftButton = styled(SocialButton)`
  background-image: url(${microsoftSvg});
`;

const ErrorPopup = styled.div`
  top: 10%;
  left: 10%;
  position: absolute;
  width: 80%;
  padding: 12px 20px;
  border: 1px solid #f3f3f3;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Close = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

export const Login: React.FC = () => {
  const history = useHistory<{ error?: string }>();
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    if (history.location.state?.error) {
      setError(history.location.state.error);
      history.replace({
        state: {},
      });
    }
  }, [history]);
  return (
    <MainContentSlot>
      {error && (
        <ErrorPopup>
          <Text value={`login.${error}`} />
          <Close src={cross} alt="close" onClick={() => setError(null)} />
        </ErrorPopup>
      )}
      <Content>
        <LoginBox>
          <LoginTitle>Login</LoginTitle>
          <GoogleButton
            href={`${process.env.REACT_APP_BACKEND_URL}/connect/google`}
          >
            Google
          </GoogleButton>
          <MicrosoftButton
            href={`${process.env.REACT_APP_BACKEND_URL}/connect/microsoft`}
          >
            Microsoft
          </MicrosoftButton>
        </LoginBox>
      </Content>
    </MainContentSlot>
  );
};
