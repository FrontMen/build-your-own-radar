import React, { useMemo, useState } from 'react';
import { Redirect, useParams } from 'react-router';

import { TechLists } from './TechLists';
import { d3Config } from 'utils/d3-config';
import { Graph } from 'components/Graph';
import { ContentTitle } from 'components/shared/ContentTitle';
import { SubNav } from 'components/SubNav';
import { QuadrantPageSkeleton } from 'components/Skeleton/Quadrantpage';
import { useQueryAsState } from 'hooks/useQueryAsState';
import { useSelector } from 'react-redux';
import {
  selectedTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';
import { selectedCompaniesSelector } from 'redux/selectors/filters';
import { quandrantDescription } from 'res/strings';
import { Slot, Content, Article, Description } from './styled';
import { filterBlipsSelector } from 'redux/selectors/d3';
import { useMediaQuery } from 'react-responsive';
import { MediaQueries } from 'Theme/Helpers';

export const Quadrant = () => {
  const { quadrant: quadrantParam } = useParams<QuadParamType>();
  const technologies = useSelector(selectedTechnologyDataSetSelector());
  const selectedCompanies = useSelector(selectedCompaniesSelector);
  const filteredBlips = useSelector(filterBlipsSelector);
  const { initialized, loading } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const isNotMobile = useMediaQuery({ query: `(${MediaQueries.phablet})` });
  const [highlighted, setHighlighted] = useState<null | string>(null);
  const [selected, setSelected] = useQueryAsState();

  const showLoader = !initialized || loading;
  const quadrantNum: number = d3Config.quadrants.findIndex(
    (item: { route: string }) => item.route === quadrantParam,
  );
  const filteredTechnologies = useMemo(
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

  const intro = (
    <>
      <ContentTitle data-testid="quadrant-content-title">
        {quadrantName}
      </ContentTitle>
      <Description>{quandrantDescription[quadrantNum]}</Description>
    </>
  );

  return (
    <Slot>
      <SubNav setSelected={setSelected}>{!isNotMobile && intro}</SubNav>
      <Content>
        <Article>
          {isNotMobile && intro}
          {filteredTechnologies.length > 0 ? (
            <TechLists
              data-testid="tech-lists"
              quadrant={quadrantParam}
              selected={selected}
              setSelected={setSelected}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              technologies={filteredTechnologies}
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
          blips={filteredBlips}
        />
      </Content>
    </Slot>
  );
};
