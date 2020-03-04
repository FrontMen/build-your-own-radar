import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';

import { MediaQueries } from 'src/Theme/Helpers';
import { useParams } from 'react-router';

import { MainContentSlot } from 'src/components/shared/PageSlots';
import { TechLists } from './TechLists';
import { useMediaQuery } from 'react-responsive';
import { useAppState } from 'src/hooks/useAppState';
import { d3Config } from 'src/utils/d3-config';
import { Graph } from 'src/components/Graph';
import { ContentTitle } from 'src/components/shared/ContentTitle';

const MobileTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  @media ${MediaQueries.phablet} {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const PhabletContainer = styled(MainContentSlot)`
  display: flex;
  justify-content: space-between;
`;

type QuadParamType = {
  readonly quadrant: string;
};

export const Quadrant = () => {
  const isNotMobile = useMediaQuery({ query: MediaQueries.tablet });
  const { quadrant: quadrantParam } = useParams<QuadParamType>();

  const quadrant: number = d3Config.quadrants.findIndex(
    (item: { name: string }) => item.name === quadrantParam,
  );
  const {
    state: { technologies },
  } = useAppState();
  const [highlighted, setHighlighted] = useState<null | string>(null);

  const data = useMemo(
    () =>
      technologies.filter(technology => technology.quadrant === quadrantParam),
    [quadrantParam, technologies],
  );

  return isNotMobile ? (
    <PhabletContainer>
      <LeftColumn>
        <ContentTitle>{quadrantParam}</ContentTitle>
        <TechLists
          data-testid="tech-lists"
          quadrant={quadrantParam}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          technologies={data}
        />
      </LeftColumn>
      <Graph
        data-testid="graph"
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
          data-testid="graph"
          highlighted={highlighted}
          quadrant={quadrant}
          setHighlighted={setHighlighted}
          technologies={data}
        />
        <ContentTitle>{quadrantParam}</ContentTitle>
      </MobileTitleSection>
      <TechLists
        data-testid="tech-lists"
        quadrant={quadrantParam}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        technologies={data}
      />
    </MainContentSlot>
  );
};
