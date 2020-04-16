import React from 'react';
import { Redirect, useParams } from 'react-router';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';
import { DetailsSkeleton } from 'components/Skeleton/Details';

import { Link } from 'react-router-dom';
import { d3Config } from 'utils/d3-config';
import { Typography } from 'Theme/Typography';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {
  allTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';
import { dateFormat } from 'utils';

const Slot = styled(MainContentSlot)``;
const BackLink = styled(({ quadName, ...props }) => <Link {...props} />)`
  display: inline-flex;
  align-items: center;
  padding: ${props => `${props.theme.space[2]}px ${props.theme.space[3]}px`};
  padding-left: 0;
  ${Typography.body};
  color: ${props => props.theme.colors[props.quadName]};
  text-decoration: none;
`;

const ArrowLeftIcon = styled(IoIosArrowRoundBack)`
  height: 2em;
  width: 2em;
`;

const Content = styled.div`
  margin: ${props => `${props.theme.space[3]}px 0 ${props.theme.space[4]}px`};
  text-align: center;
`;

const Timeline = styled.ul<{ color: string }>`
  border-left: ${props => `4px solid ${props.theme.colors[props.color || '']}`};
  margin: 50px 0% 0 30%;
  padding: 50px 0 50px 20px;
  list-style: none;
  text-align: left;

  h3 {
    font-weight: 400;
    font-size: 1.4em;
  }
`;

const TimelineItem = styled.li<{ color: string; value: string }>`
  border-bottom: 1px dashed #82cdd8;
  padding-bottom: 25px;
  position: relative;

  &:last-of-type {
    padding-bottom: 0;
    margin-bottom: 0;
    border: none;
  }

  &:before,
  &:after {
    position: absolute;
    display: block;
    top: 0;
  }

  &:before {
    left: -160px;
    top: 2px;
    content: '${props => props.value}';
    text-align: right;
    min-width: 120px;
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 1px;
  }

  &:after {
    box-shadow: ${props =>
      `0 0 0 4px ${props.theme.colors[props.color || '']}`};
    left: -28px;
    background: #fff;
    border-radius: 50%;
    height: 11px;
    width: 11px;
    content: '';
    top: 5px;
  }

  h3 {
    font-weight: 400;
    font-size: 1.4em;
  }
`;

export interface DetailsParams {
  technology?: string;
  quadrant?: string;
}

export const Details: React.FC = () => {
  const { quadrant: quadrantParam, technology: technologyParam } = useParams<
    DetailsParams
  >();
  const allData = useSelector(allTechnologyDataSetSelector);
  const { loading, initialized } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const quadrant = d3Config.quadrants.find(
    quad => quad.route === quadrantParam,
  );

  let lastDescription: string;
  const technologies = Object.entries(allData)
    .sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]))
    .map(([date, data]) => {
      const foundItem = data.find((item: Technology) =>
        item.name.toLowerCase().includes(technologyParam!),
      );
      if (foundItem) {
        if (lastDescription !== foundItem.description) {
          lastDescription = foundItem.description;
          return { ...foundItem, date };
        }
      }
      return null;
    })
    .filter(Boolean);

  if (loading || !initialized) return <DetailsSkeleton />;

  if (!quadrant || !technologies.length) return <Redirect to="/not-found" />;

  return (
    <Slot>
      <BackLink
        quadName={quadrant.name}
        to={`/${quadrantParam}`}
        data-testid="details-back-link"
      >
        <ArrowLeftIcon />
        Back to {quadrant.name}
      </BackLink>
      <Content>
        <ContentTitle data-testid="details-content-title">{`Timeline: ${technologyParam}`}</ContentTitle>
        <Timeline
          data-testid="details-timeline-container"
          color={quadrant.name}
        >
          {technologies.map((item, index) => (
            <TimelineItem
              data-testid={`details-timeline-item-${index}`}
              key={index}
              value={dateFormat(item!.date)}
              color={quadrant.name}
            >
              <h3>{item!.name}</h3>
              <p>{item!.description}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </Content>
    </Slot>
  );
};
