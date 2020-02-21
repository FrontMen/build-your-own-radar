import React from 'react';
import { Home } from '../index';
import { renderWithRouter } from '../../../../test/helpers';

describe('Home', () => {
  const { getByTestId } = renderWithRouter(<Home />);

  it('should render correctly', () => {
    const container = getByTestId('home');
    expect(container).toHaveTextContent('HOME PAGE');
  });
});
