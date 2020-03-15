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
import { useQueryAsState } from 'src/hooks/useQueryAsState';

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
  padding-right: ${props => props.theme.space[2]}px;
  @media ${MediaQueries.phablet} {
    padding-right: ${props => props.theme.space[3]}px;
  }

  @media ${MediaQueries.desktop} {
    max-width: 50%;
  }
`;

export const Quadrant = () => {
  const { quadrant: quadrantParam } = useParams<QuadParamType>();

  const quadrantNum: number = d3Config.quadrants.findIndex(
    (item: { route: string }) => item.route === quadrantParam,
  );

  const quadrantName = d3Config.quadrants[quadrantNum].name;

  const {
    state: { technologies },
  } = useAppState();
  const { state: selectedCompanies } = useContext(filterByCompanyContext);
  const [highlighted, setHighlighted] = useState<null | string>(null);
  const [selected, setSelected] = useQueryAsState();

  const data = useMemo(
    () =>
      technologies
        .filter(technology => technology.quadrant === quadrantNum)
        .filter(({ companies }) =>
          companies.some(companyType => selectedCompanies[companyType]),
        ),
    [quadrantNum, technologies, selectedCompanies],
  );

  return (
    <Slot>
      <SubNav setHighlighted={setHighlighted} />
      <Content>
        <Article>
          <ContentTitle>{quadrantName}</ContentTitle>
          {data.length ? (
            <TechLists
              data-testid="tech-lists"
              quadrant={quadrantParam}
              selected={selected}
              setSelected={setSelected}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              technologies={data}
            />
          ) : (
            <p>
              You have no datasets selected. The graph is sad{' '}
              <span role="img" aria-label="crying smile">😢</span>
            </p>
          )}
        </Article>
        <Graph
          data-testid="graph"
          highlighted={highlighted}
          quadrantNum={quadrantNum}
          setHighlighted={setHighlighted}
          setSelected={setSelected}
          technologies={data}
        />
      </Content>
    </Slot>
  );
};
