import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { radar_visualization, showBubble, hideBubble } from 'utils/d3';
import { d3Config } from 'utils/d3-config';
import styled from 'styled-components';
import { MediaQueries } from 'Theme/Helpers';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { changedTechnologiesSelector } from 'redux/selectors/d3';

const GraphWrapper = styled.div<{ fullSize: boolean | undefined }>`
  width: 100%;
  max-width: ${props => (props.fullSize ? '800px' : '440px')};
  min-width: 280px;
  height: auto;
  margin: 0 auto ${props => props.theme.space[2]}px;
  position: relative;

  @media (${MediaQueries.phablet}) {
    max-width: 80%;
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media (${MediaQueries.desktop}) {
    max-width: 50%;
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

const GraphContainer = styled.div`
  text-align: center;
  @media (${MediaQueries.desktop}) {
    position: sticky;
    top: 0;
  }
`;

const QuadrantToolTip = styled.div<{
  hoveredQuadrant: number;
  position: { posTop: number; posLeft: number };
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props => props.position.posTop + '%'};
  left: ${props => props.position.posLeft + '%'};
  width: 220px;
  min-height: 70px;
  padding: 0 20px;
  text-align: center;
  background: ${props => d3Config.quadrants[props.hoveredQuadrant].color};
  color: white;
  font-weight: bold;
  border-radius: 5px;
  font-family: Montserrat, san-serif;
  transition: 0.3s;
`;

const getTooltipPosition = (quadrant: number) => {
  const posTop = quadrant > 1 ? 10 : 80;
  const posLeft = quadrant % 3 === 0 ? 100 : -40;

  return { posTop, posLeft };
};

interface TechnologiesListProps {
  blips: Blip[];
  highlighted: string | null;
  setHighlighted?: (a: string | null) => void;
  setSelected?: (a: string | null) => void;
  quadrantNum?: number;
  className?: string | undefined;
  fullSize?: boolean;
}

export const Graph: React.FC<TechnologiesListProps> = ({
  highlighted,
  quadrantNum,
  blips,
  setHighlighted = () => {},
  setSelected = () => {},
}) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const history = useHistory();

  const redirect = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );
  const [hoveredQuadrant, setHoveredQuadrant] = useState<number>(-1);
  const changed = useSelector(changedTechnologiesSelector);
  const isNotMobile = useMediaQuery({ query: `(${MediaQueries.phablet})` });
  const isFullSize = typeof quadrantNum === 'undefined';
  useEffect(() => {
    if (d3Container.current) {
      radar_visualization(
        d3Container.current,
        blips,
        changed,
        d3Config,
        setHighlighted,
        setSelected,
        setHoveredQuadrant,
        {
          quadrantNum,
          isNotMobile,
        },
        redirect,
      );
    }
  }, [
    blips,
    quadrantNum,
    setHighlighted,
    setSelected,
    redirect,
    isNotMobile,
    changed,
  ]);

  useEffect(() => {
    const matchingBlip = blips?.find(blip => blip.positionId === highlighted);
    if (matchingBlip) {
      showBubble(matchingBlip, quadrantNum!);
    } else {
      hideBubble();
    }
  }, [highlighted, blips, quadrantNum]);

  return (
    <GraphWrapper fullSize={isFullSize}>
      <GraphContainer>
        <svg ref={d3Container} data-testid="graph" />
      </GraphContainer>
      {hoveredQuadrant > -1 && (
        <QuadrantToolTip
          hoveredQuadrant={hoveredQuadrant}
          position={getTooltipPosition(hoveredQuadrant)}
        >
          {d3Config.quadrants[hoveredQuadrant].name}
        </QuadrantToolTip>
      )}
    </GraphWrapper>
  );
};
