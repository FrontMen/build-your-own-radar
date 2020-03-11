import React, { useCallback, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { radar_visualization, showBubble, hideBubble } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';
import styled from 'styled-components';
import { MediaQueries } from 'src/Theme/Helpers';
import { useHistory } from 'react-router';

const GraphWrapper = styled.div<{ fullSize: boolean | undefined }>`
  width: 100%;
  max-width: ${props => (props.fullSize ? '800px' : '440px')};
  min-width: 280px;
  height: auto;
  margin: 0 auto ${props => props.theme.space[2]}px;

  @media ${MediaQueries.phablet} {
    max-width: 80%;
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media ${MediaQueries.desktop} {
    max-width: 50%;
    margin-bottom: ${props => props.theme.space[5]}px;
  }
`;

const GraphContainer = styled.div`
  text-align: center;
  @media ${MediaQueries.desktop} {
    position: sticky;
    top: 0;
  }
`;

interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted?: (a: string | null) => void;
  setSelected?: (a: string | null) => void;
  quadrant?: number;
  className?: string | undefined;
  fullSize?: boolean;
}

export const Graph: React.FC<TechnologiesListProps> = ({
  highlighted,
  quadrant,
  technologies,
  setHighlighted = () => {},
  setSelected = () => {},
  className: StylesFromParent,
  fullSize,
}) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const history = useHistory();

  const redirect = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  const isNotMobile = useMediaQuery({ query: MediaQueries.phablet });
  useEffect(() => {
    if (d3Container.current) {
      radar_visualization(
        d3Container.current,
        technologies,
        d3Config,
        setHighlighted,
        setSelected,
        {
          quadrant,
          isNotMobile,
        },
        redirect,
      );
    }
  }, [technologies, quadrant, setHighlighted, setSelected, redirect, isNotMobile]);

  useEffect(() => {
    const technology = technologies?.find(t => t.name === highlighted);
    if (technology) {
      showBubble(technology);
    } else {
      hideBubble();
    }
  }, [highlighted, technologies]);

  return (
    <GraphWrapper fullSize={fullSize}>
      <GraphContainer>
        <svg ref={d3Container} />
      </GraphContainer>
    </GraphWrapper>
  );
};
