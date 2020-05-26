import React from 'react';
import { ContentTitle } from 'components/shared/ContentTitle';
import { MainContentSlot } from 'components/shared/PageSlots';
import {
  RadarSkeleton,
  TitleSkeleton,
  ContentSkeleton,
  NavSkeleton,
} from './styled';
import { Content, Article, Ring, Section } from '../../pages/Quadrant/styled';

export const QuadrantPageSkeleton: React.FC = () => {
  return (
    <MainContentSlot>
      <NavSkeleton />
      <Content>
        <Article>
          <ContentTitle>
            <TitleSkeleton />
          </ContentTitle>
          <Section>
            {[...Array(4)].map((_, index) => (
              <Ring key={index}>
                <TitleSkeleton />
                <ContentSkeleton />
              </Ring>
            ))}
          </Section>
        </Article>
        <RadarSkeleton />
      </Content>
    </MainContentSlot>
  );
};
