import React from 'react';
import { Footer } from '..';
import { withAllProviders } from 'test/helpers';

describe('Footer', () => {
  /* test to check that the mobile and larger snapshot don't change unintentionally */
  it('should matches the snapshot', () => {
    const { container} = withAllProviders(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
