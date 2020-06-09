import React from 'react';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { Typography } from 'Theme/Typography';
import { Text } from 'components/Text';
import { StyledLinks } from '../Home/styled';
import RightArrow from 'res/svg/arrow-right.svg';

const NotFoundContent = styled.div`
  ${Typography.header};
  display: flex;
  justify-content: center;
  height: 50vh;
  align-items: center;
`;

const StatusCode = styled.h1`
  font-size: 140px;
  font-weight: 200;
  margin: 0;
  background: linear-gradient(130deg, #ffa34f, #ff6f68);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;
  text-align: center;
`;

const PageText = styled.h2`
  font-size: 25px;
  font-weight: 200;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 50px;
  letter-spacing: 3px;
`;

export const NotFound = () => (
  <MainContentSlot>
    <NotFoundContent data-testid="not-found-content">
      <div>
        <StatusCode>404</StatusCode>
        <PageText>
          <Text value="notfound.description" />
        </PageText>
        <StyledLinks data-testid="not-found-link" to="/">
          <Text value="notfound.link" />
          <img src={RightArrow} alt="right-arrow" />
        </StyledLinks>
      </div>
    </NotFoundContent>
  </MainContentSlot>
);
