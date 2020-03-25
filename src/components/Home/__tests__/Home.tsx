import React from 'react';
import { Home } from '../';
import { withAllProviders } from 'test/helpers';
import { technologiesStateBuilder, storeCreator } from 'test/builders';
import { parsedMockData } from 'test/mockData';
import { d3Config } from 'src/utils/d3-config';

describe('Home', () => {
  //TODO: fix this test after sceleton implementation
  it('should render correctly when content is loading', () => {
    const { getByTestId } = withAllProviders(<Home />);
    const container = getByTestId('home-loading');

    expect(container).toHaveTextContent('LOADING');
  });

  it('should render correctly when there was an error requesting data', () => {
    const errorMessage = 'some error';
    const state = technologiesStateBuilder({
      initialized: true,
      loading: false,
      error: true,
      errorMessage,
    });
    const store = storeCreator(state);
    const { getByTestId } = withAllProviders(<Home />, {
      store,
    });
    const container = getByTestId('home-error');

    expect(container).toHaveTextContent(
      `Unexpected error occurred: ${errorMessage}`,
    );
  });

  it('should render correctly when content is there', () => {
    const state = technologiesStateBuilder({
      initialized: true,
      loading: false,
      data: parsedMockData,
    });

    const store = storeCreator(state);
    const { getByTestId, container } = withAllProviders(<Home />, {
      store,
    });

    //snapshot
    expect(container).toMatchSnapshot();

    //intro
    expect(getByTestId('home-intro')).toBeTruthy();
    expect(getByTestId('home-intro-title')).toHaveTextContent('Whats this all about?');
    expect(getByTestId('home-intro-content').textContent).toContain('Consequat incididunt');

    //Graph
    expect(getByTestId('graph')).toBeTruthy();

    //quads
    expect(getByTestId('home-quadrants-wrapper')).toBeTruthy();
    d3Config.quadrants.forEach((quadrant, i) => {
      expect(getByTestId(`home-quadrant-${i}-container`)).toBeTruthy();
      expect(getByTestId(`home-quadrant-${i}-title`)).toHaveTextContent(quadrant.name);
      expect(getByTestId(`home-quadrant-${i}-content`)).toHaveTextContent('Ex tempor nulla');
      expect(getByTestId(`home-quadrant-${i}-link`)).toHaveTextContent(`look at ${quadrant.name}`);
    })
  });
});
