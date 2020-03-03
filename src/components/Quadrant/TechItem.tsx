import React from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { Link } from 'react-router-dom';
import { d3Config } from 'src/utils/d3-config';

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  break-inside: avoid;
  overflow: hidden;

  @media ${MediaQueries.phablet} {
    min-width: 9em;
  }
`;

const Details = styled.div<{ isOpened: boolean }>`
  max-height: ${props => (props.isOpened ? '75vh' : '0px')};

  transition: max-height 0.2s ease-in-out;
  overflow: hidden;
`;
const Content = styled.div`
  padding: ${props => `${props.theme.space[2]}px ${props.theme.space[0]}px`};
  overflow: hidden;
`;

const Label = styled.div<{ highlighted: boolean }>`
  ${Typography.body};
  cursor: pointer;
  padding: ${props => `${props.theme.space[0]}px ${props.theme.space[1]}px`};
  border: 1px solid white;
  color: ${props => props.highlighted && props.theme.pallet.blue};
  font-weight: ${props => props.highlighted && 600};
`;

const DetailsLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  text-decoration: none;
  margin-top: ${props => props.theme.space[2]}px;
  width: 100%;
  color: ${props => props.theme.pallet.blue};
`;

export interface TechnologyProps {
  technology: Technology;
  active: string | null;
  highlighted: string | null;
  setActive: (a: string | null) => void;
  setHighlighted: (a: string | null) => void;
  quadrant: number;
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

    const quadrantSlug = d3Config.quadrants[
      this.props.quadrant
    ].name.toLowerCase();
    const technologySlug = label.toLowerCase();
    return (
      <ListItem>
        <Label
          data-testid="label"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleClick}
          highlighted={highlighted === label}
        >
          {label}
        </Label>

        <Details data-testid="details" isOpened={active === label}>
          <Content>
            <span>{details}</span>
            <DetailsLink to={`/${quadrantSlug}/${technologySlug}`}>
              Details >
            </DetailsLink>
          </Content>
        </Details>
      </ListItem>
    );
  }
}
