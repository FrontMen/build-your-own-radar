import React, { useMemo } from 'react';
import Groupby from 'lodash.groupby';
import { Section, Ring, Title, List, Dot, Tooltip } from './styled';
import { d3Config } from 'utils/d3-config';
import { TechItem } from './TechItem';
import { ringTooltip } from 'res/strings';

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
      {Object.keys(d3Config.rings).map(ringName => (
        <Ring key={ringName}>
          <Title data-testid={`ring-title-${ringName}`}>
            <Dot color={color}>●</Dot>
            {ringName}
            <Tooltip>
              ?<span>{ringTooltip[ringName as RingNamesType]}</span>
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
