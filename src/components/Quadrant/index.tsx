import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from '../../Theme/Typography';
import { MediaQueries } from '../../Theme/Helpers';
import { useLocation } from 'react-router';

import { MainContentSlot } from '../shared/PageSlots';
import { TechLists } from './TechLists';
import { useMediaQuery } from 'react-responsive';

const Title = styled.h2`
${Typography.header}
font-size: ${props => props.theme.fontSize[1]}em;
text-transform: capitalize;



@media ${MediaQueries.phablet}{
    font-size: ${props => props.theme.fontSize[2]}em;
    
    margin-top: 0;
}
`;

type CornerTypes = {
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const RadarPlaceholder = styled.div<CornerTypes>`
  background-color: ${props => props.theme.pallet.blue};
  ${props => `border-${props.corner}-radius`}: 100%;
  align-self: ${props =>
    props.corner === 'top-left' || props.corner === 'bottom-left'
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

  @media ${MediaQueries.phablet} {
    align-self: flex-start;
  }
`;

const MobileTitleSection = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-content: space-between;

  @media ${MediaQueries.phablet} {
    flex-direction: row;
    align-content: unset;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 400px;
`;

const PhabletContainer = styled(MainContentSlot)`
  display: flex;
  justify-content: space-between;
`;

export const Quadrant = () => {
  let location = useLocation();
  let title = location.pathname.substring(1);
  const isNotMobile = useMediaQuery({ query: MediaQueries.phablet });

  return isNotMobile ? (
    <PhabletContainer>
      <LeftColumn>
        <Title>{title}</Title>
        <TechLists />
      </LeftColumn>
      <RadarPlaceholder corner={'top-left'} />
    </PhabletContainer>
  ) : (
    <MainContentSlot>
      <MobileTitleSection>
        <Title>{title}</Title>
        <RadarPlaceholder corner={'top-left'} />
      </MobileTitleSection>
      <TechLists />
    </MainContentSlot>
  );
};
