import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/macro';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { useLocation } from 'react-router';

import { MainContentSlot } from '../shared/PageSlots';
import { TechLists } from './TechLists';
import { useMediaQuery } from 'react-responsive';
import {useAppState} from 'src/hooks/useAppState';
import {radar_visualization} from 'src/utils/d3';
import {config} from 'src/components/Radar/config';
import {TechnologiesList} from 'src/components/TechnologiesList';

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize[1]}em;
  text-transform: capitalize;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[2]}em;

    margin-top: 0;
  }
  ${Typography.header}
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

  const {
    state: { technologies },
  } = useAppState();
  const [highlighted, setHighlighted] = useState<null | string>(null);

  const hack = useRef<any>();
  useEffect(() => {
    if (technologies) {
      hack.current = radar_visualization(technologies, config, setHighlighted, {
        width: 460,
        height: 460,
      });
    }
  }, [technologies]);

  useEffect(() => {
    const technology = technologies?.find(t => t.label === highlighted);
    if (technology) {
      hack.current?.(technologies?.find(t => t.label === highlighted));
    }
  }, [highlighted]);
  if (!technologies) {
    return null;
  }

  return isNotMobile ? (
    <PhabletContainer>
      <LeftColumn>
        <Title>{title}</Title>
        <TechLists
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          technologies={technologies.map(t => ({
            ...t,
            history:
              'lkdjfgkjdfgl dflkjg ldfkjg ldfjg kldfjg kldfjg kldjfglkjdfgl kdfjglkjdflkgjdflkjg lkdfjglkdjfgljdflkgj dfkjglkdjfk',
          }))}
        />
      </LeftColumn>
      {/*<RadarPlaceholder corner={'top-left'} />*/}
      <svg id={'radar'} />
    </PhabletContainer>
  ) : (
    <MainContentSlot>
      <MobileTitleSection>
        <Title>{title}</Title>
        <RadarPlaceholder corner={'bottom-right'} />
      </MobileTitleSection>
      <TechLists
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
