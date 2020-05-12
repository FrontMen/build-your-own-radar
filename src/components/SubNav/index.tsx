import React from 'react';
import styled from 'styled-components';
import { MediaQueries } from 'Theme/Helpers';
import { Link, useParams } from 'react-router-dom';
import { Typography } from 'Theme/Typography';
import { d3Config } from 'utils/d3-config';
import { Search } from 'components/Search';
import { FilterByCompany } from 'components/FilterByCompany';
import { DataSetFilter } from 'components/DataSetFilter';
import { Text } from 'components/Text';
import { transMapper } from 'utils';

const Container = styled.div`
  display: flex;
  flex: 1 1 100%;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const QuadLink = styled(Link)`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  ${Typography.body};
  font-size: ${props => props.theme.fontSize[0]}em;
  font-weight: 700;
  line-height: 1.25;
  text-decoration: none;
  color: inherit;
  padding: ${({ theme }) => `${theme.space[3]}px`};
  margin-bottom: ${props => props.theme.space[2]}px;
  color: ${props => props.theme.pallet.white};
  transition: opacity 100ms ease-in;
  background-color: ${props => props.theme.pallet.secondary};
  border-left: 1px solid ${props => props.theme.pallet.grayLight};

  @media (${MediaQueries.phablet}) {
    max-width: 50%;
  }

  @media (${MediaQueries.tablet}) {
    max-width: 25%;
    margin-bottom: ${props => props.theme.space[0]}px;
  }
`;

// Separate out colouring so that styling is easier to think about.
const ColoredLinks = styled(({ selected, quadName, ...props }) => (
  <QuadLink {...props} />
))`
  background-color: ${props =>
    props.selected && props.theme.colors[props.quadName]};

  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.colors[props.quadName]};
    }
  }
`;

interface SubNavProps {
  setSelected: (a: string | null, shouldScroll?: boolean) => void;
  children?: React.ReactNode;
}

export interface Params {
  quadrant?: string;
  technology?: string;
}

export const SubNav: React.FC<SubNavProps> = ({ setSelected, children }) => {
  const { quadrant: quadrantPram } = useParams<Params>();

  return (
    <>
      <Container data-testid="subnav-container">
        {d3Config.quadrants.map(
          ({ name, route }: { name: string; route: string }, index) => (
            <ColoredLinks
              data-testid={`subnav-link-${index}`}
              selected={quadrantPram === route}
              quadName={name}
              to={`/${route}`}
              key={name}
            >
              <Text value={`quadrant.${transMapper[index]}.name`} />
            </ColoredLinks>
          ),
        )}
      </Container>
      <Container>
        {children}
        <Search setSelected={setSelected} />
        <DataSetFilter />
        <FilterByCompany />
      </Container>
    </>
  );
};
