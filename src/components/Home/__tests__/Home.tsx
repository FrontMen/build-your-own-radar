import React from 'react';
import { render } from '@testing-library/react';
import { Home } from '../index';

describe('Home', () => {
  const { getByTestId } = render(<Home />);

  it('should render correctly', () => {
    const container = getByTestId('home');
    expect(container).toHaveTextContent('HOME PAGE');
  });
});
