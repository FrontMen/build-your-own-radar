import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MediaQueries } from 'Theme/Helpers';
import { Typography } from 'Theme/Typography';

export const Intro = styled.div`
  margin: auto;
  margin-bottom: ${props => props.theme.space[2]}px;
  max-width: 48em;

  @media (${MediaQueries.phablet}) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media (${MediaQueries.desktop}) {
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

export const Quads = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-gap: ${props => props.theme.space[4]}px;

  @media (${MediaQueries.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
`;

export const Quadrant = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media (${MediaQueries.tablet}) {
    width: 100%;
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

export const Content = styled.p`
  ${Typography.body};
  margin: 0;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

export const StyledLinks = styled(Link)`
  margin-top: auto;
  text-decoration: none;
  font-weight: 700;
  color: ${props => props.theme.pallet.primary};
`;
