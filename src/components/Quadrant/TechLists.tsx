import React, {useState} from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { QuadrantMockData } from './mock';
import { TechItem } from './TechItem';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 20em;
`;

const Title = styled.h3`
padding: ${props => `${props.theme.space[3]}px ${props.theme.space[2]}px`};
font-size: ${props => props.theme.fontSize[0]};
${Typography.header}

@media ${MediaQueries.phablet} {
    font-size: ${props => props.theme.fontSize[1]};
}
`;

const List = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
`;

interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
}

export const TechLists: React.FC<TechnologiesListProps> = ({
  technologies,
  highlighted,
  setHighlighted,
}) => {
  const [active, setActive] = useState<null | string>(null);

  return (
    <Section>
      {Object.keys(QuadrantMockData).map((key, i) => (
        <React.Fragment key={i}>
          <Title>{key}</Title>
          <List>
            {technologies.map(technology => (
              <TechItem
                technology={technology}
                key={technology.label}
                active={active}
                setActive={setActive}
                highlighted={highlighted}
                setHighlighted={setHighlighted}
              />
            ))}
          </List>
        </React.Fragment>
      ))}
    </Section>
  );
};
