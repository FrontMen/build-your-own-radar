import React from 'react';
import styled from 'styled-components';
import { Typography } from 'src/Theme/Typography';
import { MediaQueries } from 'src/Theme/Helpers';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';

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
  background-color: ${props => props.theme.pallet.light};
`;
const Content = styled.div`
  padding: ${props => `${props.theme.space[2]}px`};
  overflow: hidden;
`;

const Label = styled.div<{ highlighted: boolean }>`
  ${Typography.body};
  cursor: pointer;
  padding: ${props => props.theme.space[1] / 2}px;
  color: ${props => props.highlighted && props.theme.pallet.white};
  background-color: ${props => props.highlighted && props.theme.pallet.blue};
  font-weight: ${props => props.highlighted && 600};
`;

const DetailsLink = styled(Link)`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.space[2]}px;
  width: 100%;
  color: ${props => props.theme.pallet.blue};
  display: flex;
  font-weight: 400;
  font-size: 0.9em;
  text-decoration: none;
`;

const ArrowRightIcon = styled(IoIosArrowRoundForward)`
  height: 2em;
  width: 2em;
`;

export interface TechnologyProps {
  technology: Technology;
  highlighted: string | null;
  setHighlighted: (a: string | null) => void;
  selected: string | null;
  setSelected: (a: string | null) => void;
  quadrant: string;
}

// use Component here to do smart memo which is much more tricky to achieve with hooks
export class TechItem extends React.Component<TechnologyProps> {
  shouldComponentUpdate(nextProps: TechnologyProps) {
    const {
      highlighted: prevHighlighted,
      selected: prevActive,
      technology: { name: prevName },
    } = this.props;

    const {
      highlighted: nextHighlighted,
      selected: nextActive,
      technology: { name: nextName },
    } = nextProps;

    // updating if highlighted property changed
    if (
      (prevHighlighted === prevName && nextHighlighted !== nextName) ||
      (prevHighlighted !== prevName && nextHighlighted === nextName)
    ) {
      return true;
    }
    // updating if selected property changed
    if (
      (prevActive === prevName && nextActive !== nextName) ||
      (prevActive !== prevName && nextActive === nextName)
    ) {
      return true;
    }
    // otherwise not
    return false;
  }

  handleMouseOver = () => this.props.setHighlighted(this.props.technology.name);

  handleMouseOut = () => this.props.setHighlighted(null);

  handleClick = () => {
    const {
      setSelected,
      technology: { name },
      selected,
    } = this.props;
    setSelected(name === selected ? null : name);
  };

  render() {
    const {
      selected,
      highlighted,
      technology: { name, description },
    } = this.props;

    const quadrantSlug = this.props.quadrant.toLowerCase();
    const technologySlug = name.toLowerCase();
    return (
      <ListItem>
        <Label
          data-testid="label"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleClick}
          highlighted={highlighted === name}
        >
          {name}
        </Label>

        <Details data-testid="details" isOpened={selected === name}>
          <Content>
            <span dangerouslySetInnerHTML={{ __html: description }} />
            <DetailsLink to={`/${quadrantSlug}/${technologySlug}`}>
              {'More '}
              <ArrowRightIcon data-testid="arrow-right-icon" />
            </DetailsLink>
          </Content>
        </Details>
      </ListItem>
    );
  }
}
