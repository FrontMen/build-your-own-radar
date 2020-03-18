import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { TechItem } from './TechItem';

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Ring = styled.div`
  min-width: 12rem;
  padding-right: ${props => props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[4]}px;
  break-inside: avoid;

  @media ${MediaQueries.phablet} {
    width: 50%;
  }
`;

const Title = styled.h3`
  ${Typography.header};
  font-size: ${props => props.theme.fontSize[0]}em;
  margin: 0;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]}em;
  }
`;

const List = styled.ul`
  padding-left: 0;
  margin: 0;
`;

export interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  selected: string | null;
  setSelected: (a: string | null) => void;
  quadrant: string;
}

export const TechLists: React.FC<TechnologiesListProps> = ({
  technologies,
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  quadrant,
}) => {
  const data = useMemo(
    () =>
      technologies.reduce(
        (acc, tech) => {
          const ringName = tech.ring;
          if (acc[ringName]) {
            acc[ringName].push(tech);
          } else {
            acc[ringName] = [tech];
          }
          return acc;
        },
        {} as {
          [key: string]: Technology[];
        },
      ),
    [technologies],
  );

  return (
    <Section data-testid="tech-lists-section">
      {Object.entries(data).map(([ring, technologiesInRing]) => (
        <Ring key={ring}>
          <Title data-testid={`ring-title-${ring}`}>{ring}</Title>
          <List>
            {technologiesInRing.map(technology => (
              <TechItem
                technology={technology}
                key={technology.name}
                selected={selected}
                setSelected={setSelected}
                highlighted={highlighted}
                setHighlighted={setHighlighted}
                quadrant={quadrant}
              />
            ))}
          </List>
        </Ring>
      ))}
    </Section>
  );
};
