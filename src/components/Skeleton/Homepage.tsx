import React from 'react';
import { MainContentSlot } from '../shared/PageSlots';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { RadarSkeleton, TitleSkeleton, ContentSkeleton } from './styled';
import { Intro, Quads, Content, Quadrant } from '../Home/styled';

const HomePageSkeleton: React.FC = () => {
  return (
    <MainContentSlot>
      <Intro>
        <ContentTitle>
          <TitleSkeleton />
        </ContentTitle>
        <Content>
          <ContentSkeleton />
        </Content>
      </Intro>
      <RadarSkeleton />
      <Quads>
        {[...Array(4)].map((_, index) => (
          <Quadrant key={index}>
            <ContentTitle>
              <TitleSkeleton />
            </ContentTitle>
            <Content>
              <ContentSkeleton />
            </Content>
            <TitleSkeleton />
          </Quadrant>
        ))}
      </Quads>
    </MainContentSlot>
  );
};

export default HomePageSkeleton;
