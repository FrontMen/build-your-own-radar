import React from 'react';
import Details from '../Details';
import { withAllProviders } from 'test/helpers';

const TEST_ID = 'testId';

describe('Details', () => {
  const { getByTestId } = withAllProviders(<Details />, {
    path: '/:quadrant/:technology',
    route: `/foo/${TEST_ID}`,
  });

  it('should render :technology', () => {
    //TODO: fix it
    // const container = getByTestId('details');
    // expect(container).toHaveTextContent(TEST_ID);
  });
});
