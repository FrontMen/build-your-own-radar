import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { MainContentSlot } from 'components/shared/PageSlots';
import { ContentTitle } from 'components/shared/ContentTitle';

import { Link } from 'react-router-dom';
import { d3Config } from 'utils/d3-config';
import { Typography } from 'Theme/Typography';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { selectedTechnologyDataSetSelector } from 'redux/selectors/technologies';

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
  display: flex;
  flex-direction: column;
`;

const DetailsComponent: React.FC = () => {
  const { quadrant: quadrantParam, technology: technologyParam } = useParams<
    DetailsParams
  >();

  const technologies = useSelector(selectedTechnologyDataSetSelector);

  const technology = technologies.find(
    (item: Technology) => item.name.toLowerCase() === technologyParam,
  );

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
        <ContentTitle data-testid="details">{technologyParam}</ContentTitle>
        {technology && (
          <div dangerouslySetInnerHTML={{ __html: technology.description }} />
        )}
      </Content>
    </Slot>
  );
};

export default DetailsComponent;
