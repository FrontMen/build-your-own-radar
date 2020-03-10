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
  font-size: ${props => props.theme.fontSize[0]};
  margin: 0;
  margin-bottom: ${props => props.theme.space[2]}px;

  @media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
  }
`;

const List = styled.ul`
  padding-left: 0;
  margin: 0;
`;

const Dot = styled.span`
  color: #1ebccd;
  padding-right: 4px;
`;

const ToolTip = styled.span`
  background-color: #bfc0bf;
  position: relative;
  display: inline-block;
  line-height: 22px;
  width: 22px;
  margin-left: 12px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    .tooltip-text {
      visibility: visible;
      opacity: 1;
    } 
  }

  .tooltip-text {
    visibility: hidden;
    position: absolute;
    font-size: 12px;
    width: 270px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    z-index: 1;
    bottom: 130%;
    margin-left: -80px;
    opacity: 1;
    transition: opacity 0.3s;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -64px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }
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
    <Section>
      {Object.entries(data).map(([ring, technologiesInRing]) => (
        <Ring key={ring}>
          <Title>
            <Dot>●</Dot>
            {ring}
            <ToolTip>?
              <span className="tooltip-text">
                Worth pursuing. It is important to understand how to build up this capability. 
                Entreprises should try this technology on a project that can handle the risk
              </span>
            </ToolTip>
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
