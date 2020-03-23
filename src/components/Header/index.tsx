import React from 'react';
import styled from 'styled-components/macro';
import { MediaQueries } from 'src/Theme/Helpers';
import { Typography } from 'src/Theme/Typography';
import { HeaderSlot } from '../shared/PageSlots';
import { Link } from 'react-router-dom';
import { Logo } from 'src/components/Header/Logo';

const Slot = styled(HeaderSlot)`
  height: 48px;

  @media ${MediaQueries.desktop} {
    height: 88px;
  }
`;

const StylelessLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PageTitle = styled.h1`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[1]}em;
  margin: 0;
  text-decoration: none;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[2]}em;
    font-weight: 700;
  }
`;

export const Header = () => (
  <Slot>
    <StylelessLink to="/" data-testid="home-link">
      <PageTitle>Tech Radar</PageTitle>
    </StylelessLink>
    <Logo />
  </Slot>
);
