import React from 'react';
import { withAllProviders } from 'test/helpers';
import { SubNav } from 'components/SubNav';
import { fireEvent } from '@testing-library/react';
import { lightTheme } from 'Theme';

const child = <div data-testid="child" />;

describe('SubNav component', () => {
  const setSelected = jest.fn();

  it('Selected quadrant should be coloured', () => {
    const { getByTestId } = withAllProviders(
      <SubNav setSelected={setSelected} />,

      { path: '/:quadrant', route: '/foo' },
    );

    const link = getByTestId('subnav-link-1');

    expect(link).toHaveStyleRule(
      'background-color',
      lightTheme.pallet.secondary,
    );

    fireEvent.click(link);

    expect(link).toHaveStyleRule(
      'background-color',
      lightTheme.colors['Tooling en testing'],
    );
  });

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
