import React from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  break-inside: avoid;

  @media ${MediaQueries.phablet} {
    min-width: 9em;
    width: 50%;
  }
`;

export const Details = styled.div<{ isOpened: boolean }>`
  max-height: ${props => (props.isOpened ? '75vh' : '0px')};
  transition: max-height 0.2s ease-in-out;
  overflow: hidden;
`;

export const Label = styled.div<{ highlighted: boolean }>`
  ${Typography.body};
  cursor: pointer;
  padding: ${props => `${props.theme.space[0]}px ${props.theme.space[1]}px`};
  border: 1px solid white;
  color: ${props => props.highlighted && props.theme.pallet.blue};
  font-weight: ${props => props.highlighted && 600};
`;

export interface TechnologyProps {
  technology: Technology;
  active: string | null;
  highlighted: string | null;
  setActive: (a: string | null) => void;
  setHighlighted: (a: string | null) => void;
}

// use Component here to do smart memo which is much more tricky to achieve with hooks
export class TechItem extends React.Component<TechnologyProps> {
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

  handleMouseOver = () =>
    this.props.setHighlighted(this.props.technology.label);

  handleMouseOut = () => this.props.setHighlighted(null);

  handleClick = () => {
    const {
      setActive,
      technology: { label },
      active,
    } = this.props;
    setActive(label === active ? null : label);
  };

  render() {
    const {
      active,
      highlighted,
      technology: { label, details },
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
        <Details isOpened={active === label}>{details}</Details>
      </ListItem>
    );
  }
}
