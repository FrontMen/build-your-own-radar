import React from 'react';
import { Home } from '../index';
import { withAllProviders } from '../../../../test/helpers';

describe('Home', () => {
  const { getByTestId } = withAllProviders(<Home />);

  it('should render correctly', () => {
    const container = getByTestId('home-title');
    expect(container).toHaveTextContent('FM Tech Radar');
  });
});
