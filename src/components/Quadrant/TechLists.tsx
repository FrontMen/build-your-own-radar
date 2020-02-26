import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../Theme/Typography';
import { MediaQueries } from '../../Theme/Helpers';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
font-size: ${props => props.theme.fontSize[0]};
${Typography.header}

@media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
}
`;

export const TechLists = () => {
  return (
    <Section>
      <Title>Adopt</Title>
      <Title>Trail</Title>
      <Title>Assess</Title>
      <Title>Hold</Title>
    </Section>
  );
};
