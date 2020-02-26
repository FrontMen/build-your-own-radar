import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from '../../Theme/Typography';
import { MediaQueries } from '../../Theme/Helpers';
import { useLocation } from 'react-router';

import { MainContentSlot } from '../shared/PageSlots';
import { TechLists } from './TechLists';

const Title = styled.h2`
${Typography.header}
font-size: ${props => props.theme.fontSize[1]}em;
text-transform: capitalize;


@media ${MediaQueries.phablet}{
    font-size: ${props => props.theme.fontSize[2]}em;
}
`;

type CornerTypes = {
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const RadarPlaceholder = styled.div<CornerTypes>`
  background-color: ${props => props.theme.pallet.blue};
  ${props => `border-${props.corner}-radius`}: 100%;
  align-self: ${props =>
    props.corner == 'top-left' || props.corner === 'bottom-left'
      ? 'flex-end'
      : 'flex-start'};
  width: 400px;
  display: block;
  max-width: 400px;

  :after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-content: space-between;

  @media ${MediaQueries.desktop} {
    flex-direction: row;
  }
`;

export const Quadrant = () => {
  let location = useLocation();
  let title = location.pathname.substring(1);
  console.log(location);
  return (
    <MainContentSlot>
      <TitleSection>
        <Title>{title}</Title>
        <RadarPlaceholder corner={'top-left'} />
      </TitleSection>
      <TechLists />
    </MainContentSlot>
  );
};
