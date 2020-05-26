import React from 'react';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { Typography } from 'Theme/Typography';

const NotFoundContent = styled.h4`
  padding-left: ${props => props.theme.space[3]}px;
  ${Typography.header};
`;

export const NotFound = () => (
  <MainContentSlot>
    <NotFoundContent data-testid="not-found-content">
      Page not found
    </NotFoundContent>
  </MainContentSlot>
);
