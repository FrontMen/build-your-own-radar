import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { useParams } from 'react-router';

import { MainContentSlot } from '../shared/PageSlots';
import { TechLists } from './TechLists';
import { useMediaQuery } from 'react-responsive';
import { useAppState } from 'src/hooks/useAppState';
import { d3Config } from 'src/utils/d3-config';
import { Graph } from '../Graph';

const Title = styled.h2`
  font-size: ${props => props.theme.fontSize[1]}em;
  text-transform: capitalize;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]}em;

    margin-top: 0;
  }
  ${Typography.header}
`;

const MobileTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  @media ${MediaQueries.phablet} {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const PhabletContainer = styled(MainContentSlot)`
  display: flex;
  justify-content: space-between;
`;

export const Quadrant = () => {
  const isNotMobile = useMediaQuery({ query: MediaQueries.tablet });
  const { quadrant: quadrantParam } = useParams();

  const quadrant = d3Config.quadrants.findIndex(q => q.name === quadrantParam);
  const {
    state: { technologies },
  } = useAppState();
  const [highlighted, setHighlighted] = useState<null | string>(null);

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
          technologies={data.map((t, i) => ({
            ...t,
            details:
              'lkdjfgkjdfgl dflkjg ldfkjg'.repeat(i + 1),
          }))}
        />
      </LeftColumn>
      <Graph
        highlighted={highlighted}
        quadrant={quadrant}
        setHighlighted={setHighlighted}
        technologies={data}
      />
    </PhabletContainer>
  ) : (
    <MainContentSlot>
      <MobileTitleSection>
        <Graph
          highlighted={highlighted}
          quadrant={quadrant}
          setHighlighted={setHighlighted}
          technologies={data}
        />
        <Title>{quadrantParam}</Title>
      </MobileTitleSection>
      <TechLists
        quadrant={quadrant}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        technologies={data.map(t => ({
          ...t,
          details:
            'lkdjfgkjdfgl dflkjg ldfkjg ldfjg kldfjg kldfjg kldjfglkjdfgl kdfjglkjdflkgjdflkjg lkdfjglkdjfgljdflkgj dfkjglkdjfk',
        }))}
      />
    </MainContentSlot>
  );
};
