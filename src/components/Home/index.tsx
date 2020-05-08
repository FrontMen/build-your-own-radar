import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';
import { d3Config } from 'utils/d3-config';
import { Graph } from 'components/Graph';
import { HomePageSkeleton } from 'components/Skeleton/Homepage';
import { Text } from 'components/Text';
import { useQueryAsState } from 'hooks/useQueryAsState';
import { useSelector } from 'react-redux';
import { technologiesLoadingStateSelector } from 'redux/selectors/technologies';
import { quadrantsSelector } from 'redux/selectors/filters';
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
import RightArrow from 'res/svg/arrow-right.svg';

export const Home: React.FC = () => {
  const quads = d3Config.quadrants;
  const { initialized, loading, error, errorMessage } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const blips = useSelector(blipsSelector());
  const quadrants = useSelector(quadrantsSelector);
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

  return (
    <MainContentSlot>
      <Intro data-testid="home-intro">
        <AboutTitle data-testid="home-intro-title">
          <Text value="about.name" />
        </AboutTitle>
        <Content data-testid="home-intro-content">
          <Text value="about.description" />
        </Content>
      </Intro>
      <HomeSearch setSelected={setSelected} className="home-search" />
      <Graph highlighted={null} blips={blips} />
      <Quads data-testid="home-quadrants-wrapper">
        {quadrants.map((quad, i) => {
          const { order, localName } = quad;

          return (
            <Quadrant key={i} data-testid={`home-quadrant-${i}-container`}>
              <ContentTitle data-testid={`home-quadrant-${i}-title`}>
                <Text value={`quadrant.${localName}.name`} />
              </ContentTitle>
              <Content data-testid={`home-quadrant-${i}-content`}>
                <Text value={`quadrant.${localName}.description`} />
              </Content>
              <StyledLinks
                data-testid={`home-quadrant-${i}-link`}
                to={`/${quads[order].route}`}
              >
                <Text value={`quadrant.${localName}.name`} />
                <Text value="words.overview" />
                <img src={RightArrow} alt="right-arrow" />
              </StyledLinks>
            </Quadrant>
          );
        })}
      </Quads>
    </MainContentSlot>
  );
};
