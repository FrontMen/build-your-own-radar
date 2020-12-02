import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';
import { DetailsSkeleton } from 'components/Skeleton/Details';
import { Text } from 'components/Text';
import { Link } from 'react-router-dom';
import { Typography } from 'Theme/Typography';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {
  allTechnologyDataSetSelector,
  technologiesLoadingStateSelector,
} from 'redux/selectors/technologies';
import { quadrantsSelector } from 'redux/selectors/filters';
import { dateFormat, transMapper } from 'utils';

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

const Record = styled.ul<{ color: string }>`
  border-left: 4px solid ${props => props.theme.colors[props.color || '']};
  margin: 50px 0% 0 30%;
  padding: 50px 0 50px 20px;
  list-style: none;
  text-align: left;
  h3 {
    font-weight: 400;
    font-size: 1.4em;
  }
`;

const RecordItem = styled.li<{ color: string; value: string }>`
  border-bottom: 1px dashed ${props => props.theme.colors[props.color || '']};
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

const Tag = styled.div`
  background: ${props => props.theme.pallet.light};
  max-width: 205px;
  padding: 10px;
  color: ${props => props.theme.pallet.dark};
  border: 1px solid ${props => props.theme.pallet.light};
  border-radius: 6px;
  word-break: break-word;
  font-family: Montserrat, san-serif;
  font-size: 0.9em;
  line-height: 20px;
`;

export interface DetailsParams {
  technology?: string;
  quadIndex?: string;
}

export const Details: React.FC = () => {
  const { quadIndex, technology: technologyParam } = useParams<DetailsParams>();
  const allData = useSelector(allTechnologyDataSetSelector);
  const { loading, initialized } = useSelector(
    technologiesLoadingStateSelector(),
  );
  const quadrants = useSelector(quadrantsSelector);
  const decodedTechName = decodeURIComponent(technologyParam || '');
  const numericQuadIndex = Number(quadIndex);
  const foundQuadrant = quadrants.find(
    item => item.order === Number(numericQuadIndex),
  );

  let lastDescription: string;
  const technologies = Object.entries(allData)
    .sort((a, b) => Date.parse(b[0]) - Date.parse(a[0]))
    .map(([date, data]) => {
      const foundItem = data.find(
        (item: Technology) => item.name === decodedTechName,
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

  if (loading || !initialized || quadrants.length === 0)
    return <DetailsSkeleton />;

  if (!foundQuadrant || !technologies.length)
    return <Redirect to="/not-found" />;

  const { name: quadrantName } = foundQuadrant;
  return (
    <Slot>
      <BackLink
        quadName={quadrantName}
        to={`/quadrant/${numericQuadIndex}`}
        data-testid="details-back-link"
      >
        <ArrowLeftIcon />
        <Text value={`quadrant.${transMapper[numericQuadIndex]}.name`} />
      </BackLink>
      <Content>
        <ContentTitle data-testid="details-content-title">{`Record: ${decodedTechName}`}</ContentTitle>
        <Record data-testid="details-record-container" color={quadrantName}>
          {technologies.map((item, index) => (
            <RecordItem
              data-testid={`details-record-item-${index}`}
              key={index}
              value={dateFormat(item!.date)}
              color={quadrantName}
            >
              <h3>{item!.name}</h3>
              {item?.description ? (
                <p>{item!.description}</p>
              ) : (
                <Tag>
                  <Text value="details.emptyDescription" />
                </Tag>
              )}
            </RecordItem>
          ))}
        </Record>
      </Content>
    </Slot>
  );
};
