import React, { useEffect, useRef } from 'react';
import { radar_visualization } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';

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
  const d3Obj = useRef<any>();

  useEffect(() => {
    if (technologies.length && d3Container.current) {
      d3Obj.current = radar_visualization(
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
    /* TODO: this can be refactored when we switch to a proper data source doing
       a lookup seems inefficient as we already know which item is being
       highlighted. */
    const technology = technologies?.find(t => t.label === highlighted);
    if (technology) {
      d3Obj.current?.(technologies?.find(t => t.label === highlighted));
    }
  }, [highlighted, technologies]);

  return <svg ref={d3Container} />;
};
