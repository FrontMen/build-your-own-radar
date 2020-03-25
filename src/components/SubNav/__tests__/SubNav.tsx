import React from 'react';
import { withAllProviders } from 'test/helpers';
import { SubNav } from 'components/SubNav';
import { fireEvent } from '@testing-library/react';
import { lightTheme } from 'Theme';

describe('SubNav component', () => {
  const setHighlighted = jest.fn();

  it('Selected quadrant should be coloured', () => {
    const { getByText } = withAllProviders(
      <SubNav setHighlighted={setHighlighted} />,

      { path: '/:quadrant', route: '/foo' },
    );

    const link = getByText('Tooling en testing');

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
      <SubNav setHighlighted={setHighlighted} />,

      { path: '/:quadrant', route: '/foo' },
    );

    expect(container).toMatchSnapshot();
  });
});
