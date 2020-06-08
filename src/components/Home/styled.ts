import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MediaQueries } from 'Theme/Helpers';
import { Typography } from 'Theme/Typography';
import { ContentTitle } from 'components/shared/ContentTitle';
import { Search } from 'components/Search';

export const Intro = styled.div`
  margin: auto;
  margin-bottom: ${props => props.theme.space[2]}px;
  max-width: 60em;
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
  margin-bottom: ${props => props.theme.space[4]}px;

  @media (${MediaQueries.tablet}) {
    height: 110px;
  }
`;

export const StyledLinks = styled(Link)`
  position: relative;
  text-decoration: none;
  font-weight: 700;
  width: fit-content;
  padding: 0.9em 1.25em;
  padding-right: 3.5em;

  color: ${props => props.theme.pallet.white};
  background-color: ${props => props.theme.pallet.blue};
  border-color: ${props => props.theme.pallet.blue};

  img {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 1.4em;
    height: 1.1em;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover {
    img {
      transform: translateX(5px);
    }
  }
`;

export const AboutTitle = styled(ContentTitle)`
  color: ${props => props.theme.pallet.blue};
`;

export const HomeSearch = styled(Search)`
  max-width: 60em;
  margin: 0 auto;
  margin-bottom: 20px;

  @media (${MediaQueries.tablet}) {
    margin-top: 0;
  }
`;
