import React from 'react';
import { Home } from '../';
import { withAllProviders } from 'test/helpers';

describe('Home', () => {
  const { getByTestId } = withAllProviders(<Home />);

  it('should render correctly', () => {
    const container = getByTestId('home-title');
    expect(container).toHaveTextContent('Whats this all about?');
  });
});
