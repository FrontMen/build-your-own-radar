import React from 'react';
import { Details } from '..';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';
import { getByRole } from '@testing-library/react';
import { mount } from 'enzyme';
import { parsedTechData } from 'test/mockData';
import {
  storeCreator,
  technologiesStateBuilder,
  filtersStateBuilder,
} from 'test/builders';

const correctQuadrant = {
  order: 0,
  color: '',
};

describe('Details', () => {
  const filterState = filtersStateBuilder({
    quadrants: [{ name: 'framework', order: 0, color: '' }],
  });
  describe('when path is incorrect', () => {
    it('should redirect to not found page when quadrant is incorrect', () => {
      const techState = technologiesStateBuilder({
        initialized: true,
        loading: false,
        data: {},
      });
      const store = storeCreator({
        ...techState,
        filters: { ...filterState.filters },
      });

      // const store = storeCreator(state);
      const wrapper = mount(<Details />, {
        wrappingComponent: AllProvidersWrapper,
        wrappingComponentProps: {
          path: '/:technology/:quadIndex',
          route: `/alpine/5`,
          store,
        },
      });

      const RedirectWrapper = wrapper.find('Redirect');

      expect(RedirectWrapper).toHaveLength(1);
      expect(RedirectWrapper.prop('to')).toMatch('not-found');
    });

    it('should redirect to not found page when technology is incorrect', () => {
      const state = technologiesStateBuilder({
        initialized: true,
        loading: false,
        data: parsedTechData,
      });
      const store = storeCreator({
        ...state,
        filters: { ...filterState.filters },
      });
      const wrapper = mount(<Details />, {
        wrappingComponent: AllProvidersWrapper,
        wrappingComponentProps: {
          path: '/:technology/:quadIndex',
          route: `/invalid-technology/2`,
          store,
        },
      });

      const RedirectWrapper = wrapper.find('Redirect');

      expect(RedirectWrapper).toHaveLength(1);
      expect(RedirectWrapper.prop('to')).toMatch('not-found');
    });
  });

  describe('when path is correct', () => {
    it('should render skeleton when data is loading', () => {
      const state = technologiesStateBuilder({
        initialized: true,
        loading: true,
        data: parsedTechData,
      });
      const store = storeCreator({
        ...state,
        filters: { ...filterState.filters },
      });
      const { getByTestId } = withAllProviders(<Details />, {
        path: '/:technology/:quadIndex',
        route: `/alpine/${correctQuadrant.order}`,
        store,
      });

      expect(getByTestId('details-skeleton')).toBeTruthy();
    });

    it('should render correctly', () => {
      const techState = technologiesStateBuilder({
        initialized: true,
        loading: false,
        data: parsedTechData,
      });
      const store = storeCreator({
        ...techState,
        filters: { ...filterState.filters },
      });
      const { getByTestId, container } = withAllProviders(<Details />, {
        path: '/:technology/:quadIndex',
        route: `/Alpine/${correctQuadrant.order}`,
        store,
      });

      expect(getByTestId('details-back-link').getAttribute('href')).toBe(
        `/quadrant/${correctQuadrant.order}`,
      );
      expect(getByTestId('details-content-title')).toHaveTextContent(
        'Timeline: Alpine',
      );
      expect(getByTestId('details-timeline-container')).toHaveStyle({
        'border-left': `4px solid ${correctQuadrant.color}`,
      });

      expect(getByTestId('details-content-title')).toHaveTextContent(
        'Timeline: Alpine',
      );

      const timeLineItem = getByTestId('details-timeline-item-0');
      expect(getByRole(timeLineItem, 'heading')).toHaveTextContent('Alpine');
      expect(container).toMatchSnapshot();
    });
  });
});
