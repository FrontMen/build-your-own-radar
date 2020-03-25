import React from 'react';
import { NotFound } from '..';
import { withAllProviders } from 'test/helpers';

describe('NotFound', () => {
  test('matches the snapshot', () => {
    const { container, getByTestId } = withAllProviders(<NotFound />);

    expect(container).toMatchSnapshot();
    expect(getByTestId('not-found-content')).toHaveTextContent('Page not found');
  });
});
