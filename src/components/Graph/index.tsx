import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { radar_visualization, showBubble, hideBubble } from 'utils/d3';
import { d3Config } from 'utils/d3-config';
import styled from 'styled-components';
import { MediaQueries } from 'Theme/Helpers';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { changedTechnologiesSelector } from 'redux/selectors/d3';
import mobileToolTipConfig from './mobileToolTipConfig';

const GraphWrapper = styled.div<{ fullSize: boolean | undefined }>`
  width: 100%;
  max-width: ${props => (props.fullSize ? '800px' : '440px')};
  min-width: 280px;
  height: auto;
  margin: 40px auto 50px;
  position: relative;

  @media (${MediaQueries.phablet}) {
    max-width: 80%;
    margin-top: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media (${MediaQueries.desktop}) {
    max-width: 50%;
    margin-top: ${props => props.theme.space[3]}px;
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

interface tooltipPosition {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const GraphContainer = styled.div`
  text-align: center;
  @media (${MediaQueries.desktop}) {
    position: sticky;
    top: 0;
  }
`;

const QuadrantToolTip = styled.div<{
  hoveredQuadrant: number;
  position: tooltipPosition;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props => props.position.top + '%'};
  right: ${props => props.position.right + '%'};
  bottom: ${props => props.position.bottom + '%'};
  left: ${props => props.position.left + '%'};
  width: 220px;
  min-height: 70px;
  padding: 0 20px;
  text-align: center;
  background: ${props => d3Config.quadrants[props.hoveredQuadrant].color};
  color: white;
  font-weight: bold;
  border-radius: 5px;
  font-family: Montserrat, san-serif;
  pointer-events: none;
`;

const QuadrantToolTipMobile = styled.div<{
  hoveredQuadrant: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props => mobileToolTipConfig[props.hoveredQuadrant].top};
  left: ${props => mobileToolTipConfig[props.hoveredQuadrant].left};
  right: ${props => mobileToolTipConfig[props.hoveredQuadrant].right};
  bottom: ${props => mobileToolTipConfig[props.hoveredQuadrant].bottom};
  width: 220px;
  padding: 0 20px;
  text-align: center;
  font-weight: bold;
  font-family: Montserrat, san-serif;
  pointer-events: none;
  transform: rotateZ(
    ${props => mobileToolTipConfig[props.hoveredQuadrant].rotateZ}
  );
`;

const getTooltipPosition = (quadrant: number) => {
  let position: tooltipPosition = {};
  quadrant > 1 ? (position.top = 10) : (position.bottom = 10);
  quadrant % 3 === 0 ? (position.right = 0) : (position.left = 0);

  return position;
};

export interface GraphProps {
  blips: Blip[];
  highlighted: string | null;
  setHighlighted?: (a: string | null) => void;
  setSelected?: (a: string | null) => void;
  quadrantNum?: number;
}

export const Graph: React.FC<GraphProps> = ({
  highlighted,
  quadrantNum,
  blips,
  setHighlighted = () => {},
  setSelected = () => {},
}) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const history = useHistory();

  const redirect = useCallback(
    (index: number) => {
      const path = d3Config.quadrants[index].route;
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
          data-testid="graph-tooltip"
          hoveredQuadrant={hoveredQuadrant}
          position={getTooltipPosition(hoveredQuadrant)}
        >
          {d3Config.quadrants[hoveredQuadrant].name}
        </QuadrantToolTip>
      )}
      {!isNotMobile &&
        d3Config.quadrants.map(({ name }, index) => (
          <QuadrantToolTipMobile
            key={name}
            data-testid="graph-tooltip-mobile"
            hoveredQuadrant={index}
          >
            {name}
          </QuadrantToolTipMobile>
        ))}
    </GraphWrapper>
  );
};
