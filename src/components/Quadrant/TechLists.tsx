import React, { useMemo } from 'react';
import Groupby from 'lodash.groupby';
import { Section, Ring, Title, List, Dot, Tooltip } from './styled';
import { d3Config } from 'src/utils/d3-config';
import { TechItem } from './TechItem';

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
  const data = useMemo(() => Groupby(technologies, 'ring'), [technologies]);

  return (
    <Section data-testid="tech-lists-section">
      {Object.entries(data).map(([ring, technologiesInRing]) => (
        <Ring key={ring}>
          <Title data-testid={`ring-title-${ring}`}>
            <Dot color={color}>●</Dot>
            {ring}
            <Tooltip>
              ?<span>{d3Config.tooltips[ring as RingNamesType]}</span>
            </Tooltip>
          </Title>
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
