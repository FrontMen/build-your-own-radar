import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import { Header } from '..';
import { withAllProviders } from 'test/helpers';

describe('Header', () => {
    /* test to check that the mobile and larger snapshot don't change unintentionally */
  test('matches the snapshot', () => {
    const { container: mobile } = withAllProviders(
      <ResponsiveContext.Provider value={{ width: 480 }}>
        <Header />
      </ResponsiveContext.Provider>,
    );

    expect(mobile).toMatchSnapshot();

    const { container: phablet } = withAllProviders(
      <ResponsiveContext.Provider value={{ width: 481 }}>
        <Header />
      </ResponsiveContext.Provider>,
    );

    expect(phablet).toMatchSnapshot();
  });
});
