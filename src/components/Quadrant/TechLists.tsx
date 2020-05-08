import React, { useMemo } from 'react';
import Groupby from 'lodash.groupby';
import { Section, Ring, Title, List, Dot, Tooltip } from './styled';
import { d3Config } from 'utils/d3-config';
import { TechItem } from './TechItem';
import { Text } from 'components/Text';

export interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  selected: string | null;
  setSelected: (a: string | null) => void;
  quadrant: string;
  color: string;
}

export const TechLists: React.FC<TechnologiesListProps> = ({
  technologies,
  highlighted,
  setHighlighted,
  selected,
  setSelected,
  quadrant,
  color,
}) => {
  const data = useMemo(() => Groupby(technologies, 'ring.name'), [
    technologies,
  ]);
  const availableRings = useMemo(
    () => Object.keys(d3Config.rings).filter(ringName => data[ringName]),
    [data],
  );

  return (
    <Section data-testid="tech-lists-section">
      {availableRings.map(ringName => (
        <Ring key={ringName}>
          <Title data-testid={`ring-title-${ringName}`}>
            <Dot color={color}>●</Dot>
            {ringName}
            <Tooltip>
              ?<Text value={`rings.${ringName}.tooltip`} />
            </Tooltip>
          </Title>
          <List>
            {data[ringName] &&
              data[ringName].map(technology => (
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
