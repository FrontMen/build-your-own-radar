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
  const { technology } = useParams<DetailsParams>();
  const {
    state: { technologies },
  } = useAppState();

  const details = technologies.find(
    (item: Technology) => item.label.toLowerCase() === technology,
  );

  console.log(details);
  return (
    <Slot>
      <ContentTitle data-testid="details">{technology}</ContentTitle>
      {details && details.label}
    </Slot>
  );
};

export default DetailsComponent;
