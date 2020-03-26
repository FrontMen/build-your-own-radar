import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { MainContentSlot } from 'src/components/shared/PageSlots';
import { ContentTitle } from 'src/components/shared/ContentTitle';

import { Link } from 'react-router-dom';
import { d3Config } from 'src/utils/d3-config';
import { Typography } from 'src/Theme/Typography';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { allTechnologyDataSetSelector } from 'src/redux/selectors/technologies';

const Slot = styled(MainContentSlot)``;
export interface DetailsParams {
  technology?: string;
  quadrant?: string;
}

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

const Timeline = styled.ul`
  border-left: 4px solid #83cdd8;
  margin: 50px auto;
  padding: 50px;
  list-style: none;
  text-align: left;
  max-width: 50%;

  h3 {
    font-weight: 400;
    font-size: 1.4em;
  }
`;

const TimelineItem = styled.li`
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
    left: -200px;
    content: '${props => props.value}';
    text-align: right;
    min-width: 120px;
    font-weight: bold;
    font-size: 1.1em;
    letter-spacing: 1px;
  }

  &:after {
    box-shadow: 0 0 0 4px #2da8bc;
    left: -58px;
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

const DetailsComponent: React.FC = () => {
  const { quadrant: quadrantParam, technology: technologyParam } = useParams<
    DetailsParams
  >();
  const allData = useSelector(allTechnologyDataSetSelector);
  const technologies = Object.entries(allData).map(([date, data]) => {
    const foundItem = data.find(
      (item: Technology) => item.name.toLowerCase() === technologyParam,
    );
    return { ...foundItem!, date };
  });
  const quadrant = d3Config.quadrants.find(
    quad => quad.route === quadrantParam,
  );

  return (
    <Slot>
      {quadrant && (
        <BackLink
          quadName={quadrant.name}
          to={`/${quadrantParam}?tech=${technologyParam}`}
        >
          <ArrowLeftIcon />
          Back to {quadrant.name}
        </BackLink>
      )}
      <Content>
        <ContentTitle data-testid="details">{`Timeline: ${technologyParam}`}</ContentTitle>
        <Timeline>
          {technologies.map((item, index) => (
            <TimelineItem key={index} value={item.date}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </Content>
    </Slot>
  );
};

export default DetailsComponent;
