import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { useParams } from 'react-router';

import { MainContentSlot } from '../shared/PageSlots';
import { TechLists } from './TechLists';
import { useMediaQuery } from 'react-responsive';
import { useAppState } from 'src/hooks/useAppState';
import { radar_visualization } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize[1]}em;
  text-transform: capitalize;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[2]}em;

    margin-top: 0;
  }
  ${Typography.header}
`;

//TODO: cleanup after finishing styling for radar container

// type CornerTypes = {
//   corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
// };
// const RadarPlaceholder = styled.div<CornerTypes>`
//   background-color: ${props => props.theme.pallet.blue};
//   ${props => `border-${props.corner}-radius`}: 100%;
//   align-self: ${props =>
//     props.corner === 'top-left' || props.corner === 'bottom-left'
//       ? 'flex-end'
//       : 'flex-start'};
//   width: 400px;
//   display: block;
//   max-width: 400px;
//
//   :after {
//     content: '';
//     display: block;
//     padding-bottom: 100%;
//   }
//
//   @media ${MediaQueries.phablet} {
//     align-self: flex-start;
//   }
// `;

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
  const isNotMobile = useMediaQuery({ query: MediaQueries.phablet });
  const { quadrant: quadrantParam } = useParams();

  const quadrant = d3Config.quadrants.findIndex(q => q.name === quadrantParam);
  const {
    state: { technologies },
  } = useAppState();
  const [highlighted, setHighlighted] = useState<null | string>(null);

  const hack = useRef<any>();
  useEffect(() => {
    if (technologies.length) {
      hack.current = radar_visualization(
        technologies,
        d3Config,
        setHighlighted,
        {
          width: 460,
          height: 460,
          quadrant,
        },
      );
    }
  }, [technologies, quadrant]);

  useEffect(() => {
    const technology = technologies?.find(t => t.label === highlighted);
    if (technology) {
      hack.current?.(technologies?.find(t => t.label === highlighted));
    }
  }, [highlighted]);

  const data = useMemo(
    () => technologies.filter(technology => technology.quadrant === quadrant),
    [quadrant, technologies],
  );

  return isNotMobile ? (
    <PhabletContainer>
      <LeftColumn>
        <Title>{quadrantParam}</Title>
        <TechLists
          quadrant={quadrant}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          technologies={data.map(t => ({
            ...t,
            history:
              'lkdjfgkjdfgl dflkjg ldfkjg ldfjg kldfjg kldfjg kldjfglkjdfgl kdfjglkjdflkgjdflkjg lkdfjglkdjfgljdflkgj dfkjglkdjfk',
          }))}
        />
      </LeftColumn>
      <svg id={'radar'} />
      {/*<RadarPlaceholder corner={'top-left'} />*/}
    </PhabletContainer>
  ) : (
    <MainContentSlot>
      <MobileTitleSection>
        <Title>{quadrantParam}</Title>
        <svg id={'radar'} />
      </MobileTitleSection>
      <TechLists
        quadrant={quadrant}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        technologies={technologies.map(t => ({
          ...t,
          history:
            'lkdjfgkjdfgl dflkjg ldfkjg ldfjg kldfjg kldfjg kldjfglkjdfgl kdfjglkjdflkgjdflkjg lkdfjglkdjfgljdflkgj dfkjglkdjfk',
        }))}
      />
    </MainContentSlot>
  );
};
