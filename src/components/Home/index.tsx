import React from 'react';
import { Link } from 'react-router-dom';
import { MainContentSlot } from '../shared/PageSlots';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { d3Config } from 'src/utils/d3-config';
import { Typography } from 'src/Theme/Typography';
import { Graph } from 'src/components/Graph';
import { useAppState } from 'src/hooks/useAppState';

const Intro = styled.div`
  margin: auto;
  margin-bottom: ${props => props.theme.space[2]}px;
  max-width: 48em;

  @media ${MediaQueries.phablet} {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media ${MediaQueries.desktop} {
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

const Quads = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-gap: ${props => props.theme.space[4]}px;

  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
  }
`;

const Quadrant = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.tablet} {
    width: 100%;
    margin-bottom: ${props => props.theme.space[4]}px;
  }
`;

const Content = styled.p`
  ${Typography.body};
  margin: 0;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const StyledLinks = styled(Link)`
  margin-top: auto;
  text-decoration: none;
  font-weight: 700;
  color: ${props => props.theme.pallet.primary};
`;

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const {
    state: { technologies },
  } = useAppState();
  return (
    <MainContentSlot data-testid="home-title">
      <Intro>
        <ContentTitle>Whats this all about?</ContentTitle>
        <Content>
          Consequat incididunt in occaecat reprehenderit culpa elit. Est
          cupidatat ex dolore duis do aliquip magna ullamco anim. Fugiat non eu
          laboris ut ea aute.
        </Content>
      </Intro>
      <Graph highlighted={null} technologies={technologies} fullSize />
      <Quads>
        {quads.map((quad, i) => (
          <Quadrant key={i}>
            <ContentTitle>{quad.name}</ContentTitle>
            <Content>
              Ex tempor nulla est nostrud non consectetur enim commodo. Elit
              aute ex pariatur commodo aute. Adipisicing eu dolore fugiat culpa
              deserunt id reprehenderit. Reprehenderit eiusmod exercitation
              labore sint enim.
            </Content>
            <StyledLinks to={`/${quad.route}`}>look at {quad.name}</StyledLinks>
          </Quadrant>
        ))}
      </Quads>
    </MainContentSlot>
  );
};
