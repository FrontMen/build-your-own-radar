import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Typography } from 'Theme/Typography';
import { MediaQueries } from 'Theme/Helpers';
import { Link } from 'react-router-dom';
import { Text } from 'components/Text';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { getSrc } from 'utils';

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  break-inside: avoid;
  overflow: hidden;
  @media (${MediaQueries.phablet}) {
    min-width: 9em;
  }
`;

const Details = styled.div<{ isOpened: boolean }>`
  max-height: ${props => (props.isOpened ? '75vh' : '0px')};
  overflow: hidden;
  background-color: ${props => props.theme.pallet.light};
`;
const Content = styled.div`
  padding: ${props => `${props.theme.space[2]}px`};
  overflow: hidden;
`;

const Label = styled.div<{ highlighted: boolean }>`
  ${Typography.body};
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
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

const DetailsLinkTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyShortName = styled.span`
  margin-right: ${props => props.theme.space[2]}px;
  ${Typography.body};
  font-size: 0.6em;
`;

const Logo = styled.img`
  margin-right: 1px;
  width: 1em;
  height: 1em;
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
      technology: { positionId },
    } = this.props;
    const {
      highlighted: nextHighlighted,
      selected: nextActive,
      technology: { positionId: nextPosition },
    } = nextProps;

    return (
      prevHighlighted === positionId ||
      nextHighlighted === positionId ||
      prevActive === positionId ||
      nextActive === positionId ||
      positionId !== nextPosition
    );
  }

  handleHovering = (param: string | null) => () =>
    this.props.setHighlighted(param);

  handleClick = () => {
    const {
      setSelected,
      technology: { positionId },
      selected,
    } = this.props;

    positionId !== selected
      ? setSelected(`?tech=${positionId}`)
      : setSelected('?tech=');
  };

  render() {
    const {
      selected,
      highlighted,
      technology: { name, description, positionId, companies },
      quadrant,
    } = this.props;

    return (
      <ListItem data-testid={`list-item-${name}`} id={positionId}>
        <Label
          data-testid="label"
          onMouseOver={this.handleHovering(positionId!)}
          onMouseOut={this.handleHovering(null)}
          onClick={this.handleClick}
          highlighted={highlighted === positionId || selected === positionId}
        >
          {name}
        </Label>

        <Details data-testid="details" isOpened={selected === positionId}>
          <Content>
            <span dangerouslySetInnerHTML={{ __html: description }} />
            <DetailsLink to={`/${encodeURIComponent(name)}/${quadrant}`}>
              <DetailsLinkTextContainer>
                <Text value="words.more" />
                <ArrowRightIcon data-testid="arrow-right-icon" />
              </DetailsLinkTextContainer>
              <DetailsLinkTextContainer>
                {companies.map(c => (
                  <Fragment key={c.shortName}>
                    <Logo
                      key={c.shortName}
                      src={getSrc(c.shortName)}
                      alt={`company ${c.shortName} logo`}
                    />
                    <CompanyShortName>
                      {c.shortName.split('_')[1]}
                    </CompanyShortName>
                  </Fragment>
                ))}
              </DetailsLinkTextContainer>
            </DetailsLink>
          </Content>
        </Details>
      </ListItem>
    );
  }
}
