import React, { useEffect, useRef, useState } from 'react';
import { config } from './config';
import { radar_visualization } from '../../utils/d3';
import { useAppState } from '../../hooks/useAppState';
import styled from 'styled-components';
import { TechnologiesList } from '../TechnologiesList';

const Container = styled.div`
  display: flex;
`;

export const Radar: React.FC = () => {
  const {
    state: { technologies },
  } = useAppState();
  const [highlighted, setHighlighted] = useState<null | string>(null);

  const hack = useRef<any>();
  useEffect(() => {
    if (technologies) {
      hack.current = radar_visualization(technologies, config, setHighlighted, {
        width: 850,
        height: 850,
      });
    }
  }, [technologies]);

  useEffect(() => {
    const technology = technologies?.find(t => t.label === highlighted);
    if (technology) {
      hack.current?.(technologies?.find(t => t.label === highlighted));
    }
  }, [highlighted]);
  if (!technologies) {
    return null;
  }
  return (
    <Container>
      <TechnologiesList
        highlighted={highlighted}
        setHighlighted={setHighlighted}
        technologies={technologies.map(t => ({
          ...t,
          history:
            'lkdjfgkjdfgl dflkjg ldfkjg ldfjg kldfjg kldfjg kldjfglkjdfgl kdfjglkjdflkgjdflkjg lkdfjglkdjfgljdflkgj dfkjglkdjfk',
        }))}
      />
      <svg id={config.svg_id} />
    </Container>
  );
};
