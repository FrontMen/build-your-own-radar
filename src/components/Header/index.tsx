import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components/macro';
import { MediaQueries } from 'src/Theme/Helpers';
import { Typography } from 'src/Theme/Typography';
import { HeaderSlot } from '../shared/PageSlots';
import { d3Config } from 'src/utils/d3-config';
import { Link } from 'react-router-dom';

const Slot = styled(HeaderSlot)`
  height: 138px;

  @media ${MediaQueries.desktop} {
    height: 88px;
  }
`;

const StyleLessLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PageTitle = styled.h1`
  ${Typography.header}
  font-size: ${props => props.theme.fontSize[1]}em;
  margin: 0;
  text-decoration: none;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[2]}em;
    font-weight: 700;
  }
`;

const IconButton = styled.button`
  border: 0;
  padding: 0;
  margin-left: 1em;
  background-color: transparent;
`;

const Search = styled(IoIosSearch)`
  width: 3em;
  height: 3em;
`;

const Links = styled.div`
  display: flex;
  flex-basis: 100%;
  order: 3;
  flex-wrap: wrap;

  @media ${MediaQueries.desktop} {
    order: unset;
    flex-basis: auto;
  }
`;

const QuadLink = styled(Link)`
  display: flex;
  justify-items: center;
  align-items: center;
  ${Typography.header}
  text-decoration: none;
  font-size: ${props => props.theme.fontSize[0]}em;
  color: inherit;
  width: 50%;
  height: 3em;
  padding: ${({ theme }) => `${theme.space[0]}px ${theme.space[2]}px`};

  @media ${MediaQueries.phablet} {
    width: auto;
  }
`;

export const Header = () => {
  return (
    <Slot>
      <StyleLessLink to={'/'}>
        <PageTitle>Tech Radar</PageTitle>
      </StyleLessLink>
      <Links>
        {d3Config.quadrants.map(({ name }) => (
          <QuadLink to={name} key={name}>
            {name}
          </QuadLink>
        ))}
      </Links>
      <IconButton onClick={() => alert('clicked search')}>
        <Search />
      </IconButton>
    </Slot>
  );
};
