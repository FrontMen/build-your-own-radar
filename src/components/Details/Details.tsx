import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { MainContentSlot } from 'src/components/shared/PageSlots';
import { ContentTitle } from 'src/components/shared/ContentTitle';
import { useAppState } from 'src/hooks/useAppState';

const Slot = styled(MainContentSlot)``;
export interface DetailsParams {
  technology?: string;
}

const DetailsComponent: React.FC = () => {
  const { technology: technologyParam } = useParams<DetailsParams>();
  const {
    state: { technologies },
  } = useAppState();

  const technology = technologies.find(
    (item: Technology) => item.name.toLowerCase() === technologyParam,
  );

  return (
    <Slot>
      <ContentTitle data-testid="details">{technologyParam}</ContentTitle>
      {technology && (
        <div dangerouslySetInnerHTML={{ __html: technology.description }} />
      )}
    </Slot>
  );
};

export default DetailsComponent;
