import React from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { QuadrantMockData } from './mock';
import { TechItem } from './TechItem';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 20em;
`;

const Title = styled.h3`
padding: ${props => `${props.theme.space[3]}px ${props.theme.space[2]}px`};
font-size: ${props => props.theme.fontSize[0]};
${Typography.header}

@media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
}
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TechLists = () => {
  return (
    <Section>
      {Object.keys(QuadrantMockData).map((key, i) => (
        <React.Fragment key={i}>
          <Title>{key}</Title>
          <List>
            {QuadrantMockData[key].map((item: { [K: string]: string }, i) => (
              <TechItem key={i} item={item} />
            ))}
          </List>
        </React.Fragment>
      ))}
    </Section>
  );
};
