import React, { useState } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  background-color: aqua;
  list-style: none;
`;

const History = styled.div<{ isOpened: boolean }>`
  background-color: beige;
  height: ${props => (props.isOpened ? '50px' : '0px')};
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`;

const Label = styled.div<{ highlighted: boolean }>`
  cursor: pointer;
  ${props => (props.highlighted ? 'background-color: green;' : '')};
`;

interface TechnologyProps {
  technology: Technology;
  active: string | null;
  highlighted: string | null;
  setActive: (a: string | null) => void;
  setHighlighted: (a: string | null) => void;
}

// use Component here to do smart memo which is much more tricky to achieve with hooks
class TechItem extends React.Component<TechnologyProps> {

  shouldComponentUpdate(nextProps: TechnologyProps) {
    const {
      highlighted: prevHighlighted,
      active: prevActive,
      technology: { label: prevLabel },
    } = this.props;

    const {
      highlighted: nextHighlighted,
      active: nextActive,
      technology: { label: nextLabel },
    } = nextProps;

    // updating if highlighted property changed
    if (
      (prevHighlighted === prevLabel && nextHighlighted !== nextLabel) ||
      (prevHighlighted !== prevLabel && nextHighlighted === nextLabel)
    ) {
      return true;
    }
    // updating if active property changed
    if (
      (prevActive === prevLabel && nextActive !== nextLabel) ||
      (prevActive !== prevLabel && nextActive === nextLabel)
    ) {
      return true;
    }
    // otherwise not
    return false;
  }

  handleMouseOver = () => this.props.setHighlighted(this.props.technology.label);
  handleMouseOut = () => this.props.setHighlighted(null);
  handleClick = () => {
    const {setActive, technology: { label }, active } = this.props;
    setActive(label === active ? null : label);
  };

  render() {
    const {
      active,
      highlighted,
      technology: { label, history },
    } = this.props;
    return (
      <ListItem>
        <Label
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleClick}
          highlighted={highlighted === label}
        >
          {label}
        </Label>
        <History isOpened={active === label}>{history}</History>
      </ListItem>
    );
  }
}

interface TechnologiesListProps {
  technologies: Technology[];
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
}

export const TechnologiesList: React.FC<TechnologiesListProps> = ({
  technologies,
  highlighted,
  setHighlighted,
}) => {
  const [active, setActive] = useState<null | string>(null);

  return (
    <div style={{ width: 200, height: 600, overflow: 'scroll' }}>
      {technologies.map(technology => (
        <TechItem
          key={technology.label}
          technology={technology}
          active={active}
          setActive={setActive}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
        />
      ))}
    </div>
  );
};