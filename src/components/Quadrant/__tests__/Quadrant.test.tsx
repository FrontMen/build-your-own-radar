import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import { Quadrant } from '..';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';
import { MediaQueries } from 'src/Theme/Helpers';
import { mockData } from 'test/mockData';
import { mount } from 'enzyme';

const routeProps = {
  path: '/:quadrant',
  route: '/technique',
};

describe('Quadrant', () => {
  it('matches the snapshot on mobile resolution', () => {
    const { container } = withAllProviders(
      <ResponsiveContext.Provider value={{ width: MediaQueries.phablet }}>
        <Quadrant />
      </ResponsiveContext.Provider>,
      routeProps,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot in desktop resolution', () => {
    const { container } = withAllProviders(
      <ResponsiveContext.Provider value={{ width: MediaQueries.desktop }}>
        <Quadrant />
      </ResponsiveContext.Provider>,
      routeProps,
    );

    expect(container).toMatchSnapshot();
  });

  fit('should pass down technologies filtered by quadrant', () => {
    const wrapper = mount(<Quadrant />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: routeProps,
    });

    const techLists = wrapper
      .find({
        'data-testid': 'tech-lists',
      })
      .at(0);

    expect(techLists.prop('technologies')).toEqual(
      mockData.filter(t => t.quadrant === 3),
    );
  });
});
