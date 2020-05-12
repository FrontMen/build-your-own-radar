import React from 'react';
import { withAllProviders } from 'test/helpers';
import { SubNav } from 'components/SubNav';

const child = <div data-testid="child" />;

describe('SubNav component', () => {
  const setSelected = jest.fn();

  it('should match snapshot', () => {
    const { container } = withAllProviders(
      <SubNav setSelected={setSelected} />,

      { path: '/:quadrant', route: '/foo' },
    );

    expect(container).toMatchSnapshot();
  });

  it('should render children if exist', () => {
    const { getByTestId } = withAllProviders(
      <SubNav setSelected={setSelected}>{child}</SubNav>,

      { path: '/:quadrant', route: '/foo' },
    );
    expect(getByTestId('child')).toBeTruthy();
  });
});
