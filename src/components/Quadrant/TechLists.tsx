import React, { useMemo } from 'react';
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
    <Section>
      {Object.entries(data).map(([ring, technologiesInRing]) => (
        <Ring key={ring}>
          <Title>
            <Dot>●</Dot>
            {ring}
            <Tooltip>?
              <span>
                {d3Config.tooltips[ring as RingNamesType]}
              </span>
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
