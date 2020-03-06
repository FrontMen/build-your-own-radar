import React from 'react';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';
import { Link, useParams } from 'react-router-dom';
import { Typography } from 'src/Theme/Typography';
import { d3Config } from 'src/utils/d3-config';
import { Search } from 'src/components/Search';
import { FilterByCompany } from 'src/components/FilterByCompany';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;

  @media ${MediaQueries.phablet} {
    margin-bottom: ${props => props.theme.space[4]}px;
    justify-content: space-between;
  }
`;

const Links = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap;
  @media ${MediaQueries.tablet} {
    flex-wrap: unset;
  }
`;

type LinkProps = { quadName: string };

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

  height: 3em;
  padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};

  margin-bottom: ${props => props.theme.space[2]}px;
  color: ${props => props.theme.pallet.white};

  transition: opacity 100ms ease-in;
  background-color: ${props => props.theme.pallet.secondary};

  @media ${MediaQueries.phablet} {
    max-width: 50%
  }
  @media ${MediaQueries.tablet} {
    
    max-width: 25%

    margin-bottom: ${props => props.theme.space[0]}px;
  }
`;

// Separate out colouring so that styling is easier to think about.
const ColoredLinks = styled(({ selected, quadName, ...props }) => (
  <QuadLink {...props} />
))`
  background-color: ${props =>
    props.selected && props.theme.colors[props.quadName]};

  &:hover {
    background-color: ${props => props.theme.colors[props.quadName]};
  }
`;

type PropTypes = {
  setHighlighted: React.Dispatch<React.SetStateAction<string | null>>;
};

export interface Params {
  quadrant?: string;
  technology?: string;
}

export const SubNav = ({ setHighlighted }: PropTypes) => {
  const { quadrant: quadrantPram } = useParams<Params>();

  return (
    <Container>
      <FilterByCompany />
      <Search setHighlighted={setHighlighted} />
      <Links>
        {d3Config.quadrants.map(({ name }: { name: string }) => (
          <ColoredLinks
            selected={quadrantPram === name}
            quadName={name}
            to={`/${name}`}
            key={name}
          >
            {name}
          </ColoredLinks>
        ))}
      </Links>
    </Container>
  );
};
