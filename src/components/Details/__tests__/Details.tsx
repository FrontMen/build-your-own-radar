import React from 'react';
import Details from '../Details';
import { renderWithRouter } from '../../../../test/helpers';

const TEST_ID = 'testId';

describe('Details', () => {
  const { getByTestId } = renderWithRouter(<Details />, {
    path: '/details/:id',
    route: `/details/${TEST_ID}`,
  });

  it('should render id', () => {
    const container = getByTestId('details');
    expect(container).toHaveTextContent(TEST_ID);
  });
});
