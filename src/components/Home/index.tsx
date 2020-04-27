import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';
import { d3Config } from 'utils/d3-config';
import { Graph } from 'components/Graph';
import { HomePageSkeleton } from 'components/Skeleton/Homepage';
import { useQueryAsState } from 'hooks/useQueryAsState';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';
import {
  Intro,
  Quads,
  Quadrant,
  Content,
  StyledLinks,
  AboutTitle,
  HomeSearch,
} from './styled';
import { blipsSelector } from 'redux/selectors/d3';
import { quandrantDescription, aboutText, quandrantNames } from 'res/strings';
import RightArrow from 'res/svg/arrow-right.svg';

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const { initialized, loading, error, errorMessage } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const technologies = useSelector(selectedTechnologyDataSetSelector());
  const blips = useSelector(blipsSelector());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelected] = useQueryAsState();
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
        <AboutTitle data-testid="home-intro-title">About</AboutTitle>
        <Content data-testid="home-intro-content">{aboutText}</Content>
      </Intro>
      <HomeSearch setSelected={setSelected} className="home-search" />
      <Graph highlighted={null} blips={blips} />
      <Quads data-testid="home-quadrants-wrapper">
        {quads.map((quad, i) => (
          <Quadrant key={i} data-testid={`home-quadrant-${i}-container`}>
            <ContentTitle data-testid={`home-quadrant-${i}-title`}>
              {quandrantNames[1]}
            </ContentTitle>
            <Content data-testid={`home-quadrant-${i}-content`}>
              {quandrantDescription[i]}
            </Content>
            <StyledLinks
              data-testid={`home-quadrant-${i}-link`}
              to={`/${quad.route}`}
            >
              Overview of {quandrantNames[i]}
              <img src={RightArrow} alt="right-arrow" />
            </StyledLinks>
          </Quadrant>
        ))}
      </Quads>
    </MainContentSlot>
  );
};
