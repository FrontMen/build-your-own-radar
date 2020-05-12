import React from 'react';
import { Home } from '../';
import { withAllProviders } from 'test/helpers';
import {
  technologiesStateBuilder,
  storeCreator,
  rootStateBuilder,
} from 'test/builders';
import { parsedTechData, mockQuadrants } from 'test/mockData';
import { d3Config } from 'utils/d3-config';

describe('Home', () => {
  it('should render correctly when content is loading', () => {
    const { getByTestId } = withAllProviders(<Home />);
    const container = getByTestId('home-skeleton');

    expect(container).toBeTruthy();
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
    const [dataSetKey] = Object.entries(parsedTechData)[0];
    const state = rootStateBuilder({
      technologies: {
        initialized: true,
        loading: false,
        data: parsedTechData,
      },
      filters: {
        dataSet: {
          selected: dataSetKey,
        },
        quadrants: mockQuadrants,
      },
    });

    const store = storeCreator(state);
    const { getByTestId, container } = withAllProviders(<Home />, {
      store,
    });

    //snapshot
    expect(container).toMatchSnapshot();

    //intro
    expect(getByTestId('home-intro')).toBeTruthy();
    expect(getByTestId('home-intro-title')).toHaveTextContent('about.name');
    expect(getByTestId('home-intro-content')).toHaveTextContent(
      'about.description',
    );

    //Graph
    expect(getByTestId('graph')).toBeTruthy();

    //quads
    expect(getByTestId('home-quadrants-wrapper')).toBeTruthy();
    d3Config.quadrants.forEach((quadrant, i) => {
      expect(getByTestId(`home-quadrant-${i}-container`)).toBeTruthy();
    });
  });
});
