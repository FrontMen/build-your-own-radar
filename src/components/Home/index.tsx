import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';
import { d3Config } from 'utils/d3-config';
import { Graph } from 'components/Graph';
import { HomePageSkeleton } from 'components/Skeleton/Homepage';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';
import { Intro, Quads, Quadrant, Content, StyledLinks } from './styled';

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const { initialized, loading, error, errorMessage } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const technologies = useSelector(selectedTechnologyDataSetSelector());
  const showLoader = !initialized || loading;

  if (showLoader) return <HomePageSkeleton />;

  if (error) {
    //TODO: replace this with component error state
    return (
      <div data-testid="home-error">
        Unexpected error occurred: {errorMessage}
      </div>
    );
  }

  if (technologies === null) {
    //TODO: define the state when no technologies from API
    return null;
  }

  return (
    <MainContentSlot>
      <Intro data-testid="home-intro">
        <ContentTitle data-testid="home-intro-title">
          Whats this all about?
        </ContentTitle>
        <Content data-testid="home-intro-content">
          Consequat incididunt in occaecat reprehenderit culpa elit. Est
          cupidatat ex dolore duis do aliquip magna ullamco anim. Fugiat non eu
          laboris ut ea aute.
        </Content>
      </Intro>
      <Graph highlighted={null} technologies={technologies} />
      <Quads data-testid="home-quadrants-wrapper">
        {quads.map((quad, i) => (
          <Quadrant key={i} data-testid={`home-quadrant-${i}-container`}>
            <ContentTitle data-testid={`home-quadrant-${i}-title`}>
              {quad.name}
            </ContentTitle>
            <Content data-testid={`home-quadrant-${i}-content`}>
              Ex tempor nulla est nostrud non consectetur enim commodo. Elit
              aute ex pariatur commodo aute. Adipisicing eu dolore fugiat culpa
              deserunt id reprehenderit. Reprehenderit eiusmod exercitation
              labore sint enim.
            </Content>
            <StyledLinks
              data-testid={`home-quadrant-${i}-link`}
              to={`/${quad.route}`}
            >
              look at {quad.name}
            </StyledLinks>
          </Quadrant>
        ))}
      </Quads>
    </MainContentSlot>
  );
};
