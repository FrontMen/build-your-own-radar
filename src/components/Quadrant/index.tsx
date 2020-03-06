import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { MediaQueries } from 'src/Theme/Helpers';
import { useParams } from 'react-router';

import { MainContentSlot } from 'src/components/shared/PageSlots';
import { TechLists } from './TechLists';
import { useAppState } from 'src/hooks/useAppState';
import { d3Config } from 'src/utils/d3-config';
import { Graph } from 'src/components/Graph';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { filterByCompanyContext } from 'src/ContextProviders/FilterByCompanyContextProvider';
import { SubNav } from 'src/components/SubNav';

const Slot = styled(MainContentSlot)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  flex-grow: 1;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  @media ${MediaQueries.phablet} {
    margin-right: ${props => props.theme.space[3]}px;
  }

  @media ${MediaQueries.tablet} {
  }
`;

const GraphLayout = styled(Graph)`
  order: 0;
  color: red;
`;

export const Quadrant = () => {
  const { quadrant: quadrantParam } = useParams<QuadParamType>();

  const quadrant: number = d3Config.quadrants.findIndex(
    (item: { name: string }) => item.name === quadrantParam,
  );
  const {
    state: { technologies },
  } = useAppState();
  const { state: selectedCompanies } = useContext(filterByCompanyContext);
  const [highlighted, setHighlighted] = useState<null | string>(null);

  const data = useMemo(
    () =>
      technologies
        .filter(technology => technology.quadrant === quadrantParam)
        .filter(({ companies }) =>
          companies.some(companyType => selectedCompanies[companyType]),
        ),
    [quadrantParam, technologies, selectedCompanies],
  );
  
  return (
    <Slot>
      <SubNav setHighlighted={setHighlighted} />
      <Content>
        <Article>
          <ContentTitle>{quadrantParam}</ContentTitle>
          {data.length ? (
            <TechLists
              data-testid="tech-lists"
              quadrant={quadrantParam}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              technologies={data}
            />
          ) : (
            <p>
              You have no datasets selected. The graph is sad{' '}
              <span role={'img'}>😢</span>
            </p>
          )}
        </Article>
        <GraphLayout
          data-testid="graph"
          highlighted={highlighted}
          quadrant={quadrant}
          setHighlighted={setHighlighted}
          technologies={data}
        />
      </Content>
    </Slot>
  );
};
