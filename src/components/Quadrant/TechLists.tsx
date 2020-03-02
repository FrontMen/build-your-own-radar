import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { TechItem } from './TechItem';
import { d3Config } from 'src/utils/d3-config';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${MediaQueries.phablet} {
    width: 20em;
    height: 75vh;
    overflow: auto;
  }
`;

const Title = styled.h3`
padding: ${props => `${props.theme.space[3]}px ${props.theme.space[2]}px`};
font-size: ${props => props.theme.fontSize[0]};
${Typography.header}

@media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
}
`;

const List = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
`;

interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  quadrant: number;
}

export const TechLists: React.FC<TechnologiesListProps> = ({
  technologies,
  highlighted,
  setHighlighted,
  quadrant,
}) => {
  const [expanded, setExpanded] = useState<null | string>(null);

  const data = useMemo(
    () =>
      technologies.reduce(
        (acc, tech) => {
          const ringName = d3Config.rings[tech.ring].name;
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
    <Section>
      {Object.entries(data).map(([ring, technologiesInRing]) => (
        <React.Fragment key={ring}>
          <Title>{ring}</Title>
          <List>
            {technologiesInRing.map(technology => (
              <TechItem
                technology={technology}
                key={technology.label}
                active={expanded}
                setActive={setExpanded}
                highlighted={highlighted}
                setHighlighted={setHighlighted}
              />
            ))}
          </List>
        </React.Fragment>
      ))}
    </Section>
  );
};
