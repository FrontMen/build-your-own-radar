import React, { useEffect, useRef } from 'react';
import { radar_visualization, showBubble } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';

const GraphContainer = styled.div`
  width: 100%;
  max-width: 440px;
  height: 100%;
  pointer-events: none;

  @media ${MediaQueries.phablet} {
    pointer-events: all;
  }
`;
interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  quadrant: number;
}

export const Graph: React.FC<TechnologiesListProps> = ({
  highlighted,
  quadrant,
  technologies,
  setHighlighted,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (technologies.length && d3Container.current) {
      radar_visualization(
        d3Container.current,
        technologies,
        d3Config,
        setHighlighted,
        {
          width: 460,
          height: 460,
          quadrant,
        },
      );
    }
  }, [technologies, quadrant, setHighlighted]);

  useEffect(() => {
    const technology = technologies?.find(t => t.label === highlighted);
    if (technology) {
      showBubble(technology);
    }
  }, [highlighted, technologies]);

  return (
    <GraphContainer>
      <svg ref={d3Container} />
    </GraphContainer>
  );
};
