import React from 'react';
import { FilterByCompany } from '..';
import { withAllProviders } from 'test/helpers';

describe('FilterByCompany', () => {
  it('should matches the snapshot', () => {
    const { container } = withAllProviders(<FilterByCompany />);
    expect(container).toMatchSnapshot();
  });
});
