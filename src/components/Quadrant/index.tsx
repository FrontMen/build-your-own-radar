import React, { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { MediaQueries } from 'Theme/Helpers';
import { Redirect, useParams } from 'react-router';

import { MainContentSlot } from 'components/shared/PageSlots';
import { TechLists } from './TechLists';

import { d3Config } from 'utils/d3-config';
import { Graph } from 'components/Graph';
import { ContentTitle } from 'components/shared/ContentTitle';
import { SubNav } from 'components/SubNav';
import { useQueryAsState } from 'hooks/useQueryAsState';
import { useSelector } from 'react-redux';
import { selectedTechnologyDataSetSelector } from 'redux/selectors/technologies';
import { selectedCompaniesSelector } from 'redux/selectors/filters';

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
  const { color: quadrantColor, name: quadrantName } = d3Config.quadrants[
    quadrantNum
  ];

  const technologies = useSelector(selectedTechnologyDataSetSelector);
  const selectedCompanies = useSelector(selectedCompaniesSelector);

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

  return quadrantName ? (
    <Slot>
      <SubNav setHighlighted={setHighlighted} />
      <Content>
        <Article>
          <ContentTitle data-testid="quadrant-content-title">
            {quadrantName}
          </ContentTitle>
          {data.length ? (
            <TechLists
              data-testid="tech-lists"
              quadrant={quadrantParam}
              selected={selected}
              setSelected={setSelected}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              technologies={data}
              color={quadrantColor}
            />
          ) : (
            <p data-testid="quadrant-no-content">
              You have no datasets selected. The graph is sad{' '}
              <span role="img" aria-label="crying smile">
                😢
              </span>
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
  ) : (
    <Redirect to="not-found" />
  );
};
