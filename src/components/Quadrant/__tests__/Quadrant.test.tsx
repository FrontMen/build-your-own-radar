import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import { mount } from 'enzyme';
import { Quadrant } from '..';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';
import { MediaQueries } from 'Theme/Helpers';
import { parsedMockData } from 'test/mockData';
import { rootStateBuilder, storeCreator, technologiesStateBuilder } from 'test/builders';

const routeProps = {
  path: '/:quadrant',
  route: '/technique',
};
const [dataSetKey, dataSetValue] = Object.entries(parsedMockData)[0];
const state = rootStateBuilder({
  technologies: {
    initialized: true,
    loading: false,
    data: parsedMockData,
  },
  filters: {
    dataSet: {
      selected: dataSetKey,
    },
  },
});

const store = storeCreator(state);

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

  it('matches the snapshot when data is there', () => {
    const state = technologiesStateBuilder({
      initialized: true,
      loading: false,
      data: parsedMockData,
    });
    const store = storeCreator(state);

    const { container } = withAllProviders(
      <ResponsiveContext.Provider value={{ width: MediaQueries.desktop }}>
        <Quadrant />
      </ResponsiveContext.Provider>,
      {
        ...routeProps,
        store
      },
    );

    expect(container).toMatchSnapshot();
  });

  it('should return Redirect if quadrant query param is invalid', () => {
    const wrapper = mount(<Quadrant />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: {
        path: '/:quadrant',
        route: '/invalid-param',
        store,
      },
    });
    const RedirectWrapper = wrapper.find('Redirect');

    expect(RedirectWrapper).toHaveLength(1);
    expect(RedirectWrapper.prop('to')).toMatch('not-found');
  });

  it('should pass down technologies filtered by quadrant', () => {
    const wrapper = mount(<Quadrant />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: {
        ...routeProps,
        store,
      },
    });

    const techLists = wrapper
      .find({
        'data-testid': 'tech-lists',
      })
      .at(0);

    expect(techLists.prop('technologies')).toMatchObject(
      dataSetValue.filter(t => t.quadrant === 3),
    );
  });
});
