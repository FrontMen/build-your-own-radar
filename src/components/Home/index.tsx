import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { d3Config } from 'src/utils/d3-config';
import { Graph } from 'src/components/Graph';
import { HomePageSkeleton } from 'src/components/Skeleton/Homepage';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'src/redux/selectors/technologies';
import { Intro, Quads, Quadrant, Content, StyledLinks } from './styled';

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const { initialized, loading, error, errorMessage } = useSelector(
    technologiesLoadingStateSelector,
  );
  const technologies = useSelector(selectedTechnologyDataSetSelector);
  const showLoader = !initialized || loading;

  if (showLoader) return <HomePageSkeleton />;

  if (error) {
    //TODO: replace this with component error state
    return <div>Unexpected error occured: {errorMessage}</div>;
  }

  if (technologies === null) {
    //TODO: define the state when no technologies from API
    return null;
  }

  return (
    <MainContentSlot>
      <Intro>
        <ContentTitle data-testid="home-title">
          Whats this all about?
        </ContentTitle>
        <Content>
          Consequat incididunt in occaecat reprehenderit culpa elit. Est
          cupidatat ex dolore duis do aliquip magna ullamco anim. Fugiat non eu
          laboris ut ea aute.
        </Content>
      </Intro>
      <Graph highlighted={null} technologies={technologies} fullSize />
      <Quads>
        {quads.map((quad, i) => (
          <Quadrant key={i} data-testid={`quadrant-container-${i}`}>
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
