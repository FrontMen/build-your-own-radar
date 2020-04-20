import React from 'react';
import { Details } from '../';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';
import { getByRole } from '@testing-library/react';
import { mount } from 'enzyme';
import { parsedMockData } from 'test/mockData';
import { storeCreator, technologiesStateBuilder } from 'test/builders';
import { d3Config } from 'utils/d3-config';

const correctQuadrant = d3Config.quadrants[2];

describe('Details', () => {
  describe('when path is incorrect', () => {
    it('should redirect to not found page when quadrant is incorrect', () => {
      const state = technologiesStateBuilder({
        initialized: true,
        loading: false,
        data: {},
      });
      const store = storeCreator(state);
      const wrapper = mount(<Details />, {
        wrappingComponent: AllProvidersWrapper,
        wrappingComponentProps: {
          path: '/:quadrant/:technology',
          route: `/invalid-quadrant-param/alpine`,
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
        data: parsedMockData,
      });
      const store = storeCreator(state);
      const wrapper = mount(<Details />, {
        wrappingComponent: AllProvidersWrapper,
        wrappingComponentProps: {
          path: '/:quadrant/:technology',
          route: `/platforms-infra-and-data/invalid-technology`,
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
        data: parsedMockData,
      });
      const store = storeCreator(state);
      const { getByTestId } = withAllProviders(<Details />, {
        path: '/:quadrant/:technology',
        route: `/${correctQuadrant.route}/alpine`,
        store,
      });

      expect(getByTestId('details-skeleton')).toBeTruthy();
    });

    it('should render correctly', () => {
      const state = technologiesStateBuilder({
        initialized: true,
        loading: false,
        data: parsedMockData,
      });
      const store = storeCreator(state);
      const { getByTestId, container } = withAllProviders(<Details />, {
        path: '/:quadrant/:technology',
        route: `/${correctQuadrant.route}/Alpine`,
        store,
      });

      expect(getByTestId('details-back-link')).toHaveTextContent(
        `Back to ${correctQuadrant.name}`,
      );
      expect(getByTestId('details-back-link').getAttribute('href')).toBe(
        `/${correctQuadrant.route}`,
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
