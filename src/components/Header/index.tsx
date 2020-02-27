import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { MediaQueries } from '../../Theme/Helpers';
import { Typography } from '../../Theme/Typography';
import { HeaderSlot } from '../shared/PageSlots';
import { Logo } from './Logo';

const PageTitle = styled.h1`
  margin: 0;
  font-size: ${props => props.theme.fontSize[1]}em;
  ${Typography.header}

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[2]}em;
  }
`;

const IconButton = styled.button`
  border: 0;
  padding: 0;
  height: 4em;
  width: 4em;
  margin-left: 1em;
  background-color: transparent;
`;

export const Header = () => {
  const isNotMobile = useMediaQuery({ query: MediaQueries.phablet });

  return (
    <HeaderSlot>
      {/* TODO: Decide what to call this page ånd how to show FM logo/branding */}
      <PageTitle>FM Tech Radar</PageTitle>
      {/* TODO: this can switch between an expanded and collapsed logo dependant on the screen size? */}
      <Logo />
      {!isNotMobile && (
        <IconButton onClick={() => alert('clicked search')}>
          <IoIosSearch size={'4em'} />
        </IconButton>
      )}
    </HeaderSlot>
  );
};
