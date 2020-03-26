import React from 'react';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import {
  RadarSkeleton,
  TitleSkeleton,
  ContentSkeleton,
  NavSkeleton,
} from './styled';
import { Slot, Content, Article, Ring, Section } from '../Quadrant/styled';

const QuadrantPageSkeleton: React.FC = () => {
  return (
    <Slot>
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
    </Slot>
  );
};

export default QuadrantPageSkeleton;
