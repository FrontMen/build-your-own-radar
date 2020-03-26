import React, { useMemo, useState } from 'react';
import { Redirect, useParams } from 'react-router';

import { TechLists } from './TechLists';
import { d3Config } from 'src/utils/d3-config';
import { Graph } from 'src/components/Graph';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { SubNav } from 'src/components/SubNav';
import QuadrantPageSkeleton from 'src/components/Skeleton/Quadrantpage';
import { useQueryAsState } from 'src/hooks/useQueryAsState';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'src/redux/selectors/technologies';
import { selectedCompaniesSelector } from 'src/redux/selectors/filters';
import { Slot, Content, Article } from './styled';

export const Quadrant = () => {
  const { quadrant: quadrantParam } = useParams<QuadParamType>();
  const technologies = useSelector(selectedTechnologyDataSetSelector);
  const selectedCompanies = useSelector(selectedCompaniesSelector);
  const { initialized, loading } = useSelector(
    technologiesLoadingStateSelector,
  );
  const [highlighted, setHighlighted] = useState<null | string>(null);
  const [selected, setSelected] = useQueryAsState();

  const showLoader = !initialized || loading;
  const quadrantNum: number = d3Config.quadrants.findIndex(
    (item: { route: string }) => item.route === quadrantParam,
  );
  const data = useMemo(
    () =>
      technologies.filter(
        technology =>
          technology.quadrant === quadrantNum &&
          technology.companies.some(
            companyType => selectedCompanies[companyType],
          ),
      ),
    [quadrantNum, technologies, selectedCompanies],
  );

  if (quadrantNum < 0) return <Redirect to="not-found" />;
  if (showLoader) return <QuadrantPageSkeleton />;

  const { color: quadrantColor, name: quadrantName } = d3Config.quadrants[
    quadrantNum
  ];

  return (
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
  );
};
