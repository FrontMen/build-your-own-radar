import React from 'react';
import { useParams } from 'react-router';

export interface DetailsParams {
  id?: string;
}

const DetailsComponent: React.FC = () => {
  const { id } = useParams<DetailsParams>();
  return <div data-testid="details">This is technologyId: {id}</div>;
};

export default DetailsComponent;
