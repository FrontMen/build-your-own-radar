import React from 'react';
import { Graph } from 'components/Graph';
import { withThemeProviders } from 'test/helpers';
import { parsedMockDataItem } from 'test/mockData';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components/macro';
import { lightTheme } from 'Theme';
import { d3Config } from 'utils/d3-config';

const defaultProps = {
  technologies: parsedMockDataItem,
  highlighted: null,
  setHighlighted: jest.fn(),
  setSelected: jest.fn(),
  quadrantNum: 1,
};

jest.mock('utils/d3', () => ({
  radar_visualization: jest.fn(),
  showBubble: jest.fn(),
  hideBubble: jest.fn(),
}));

jest.mock('react-router', () => ({
  useHistory: jest.fn(),
}));

describe('Graph', () => {
  /* test to check that the mobile and larger snapshot don't change unintentionally */
  it('should matches the snapshot', () => {
    const { container } = withThemeProviders(<Graph {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call showBubble when technology selected and hideBubble when not', async () => {
    const { showBubble, hideBubble } = await import('utils/d3');
    const wrapper = mount(<Graph {...defaultProps} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: {
        theme: lightTheme,
      },
    });

    wrapper.setProps({
      highlighted: parsedMockDataItem[0].positionId,
    });
    expect(showBubble).toHaveBeenCalledWith(parsedMockDataItem[0], 1);

    wrapper.setProps({
      highlighted: null,
    });
    expect(hideBubble).toHaveBeenCalled();
  });

  it('should call radar_visualization with proper params when technologies or quadrant changes', async () => {
    const {
      radar_visualization,
    }: {
      radar_visualization: jest.MockedFunction<any>;
    } = await import('utils/d3');

    const wrapper = mount(<Graph {...defaultProps} technologies={[]} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: {
        theme: lightTheme,
      },
    });

    wrapper.setProps({
      technologies: parsedMockDataItem,
    });

    const [_, technologies] = radar_visualization.mock.calls[0];
    expect(technologies).toBe(parsedMockDataItem);

    radar_visualization.mockClear();

    wrapper.setProps({
      quadrantNum: 3,
    });

    const [
      c,
      t,
      config,
      setHighlighted,
      setSelected,
      setHoveredQuadrant,
      { quadrantNum },
    ] = radar_visualization.mock.calls[0];
    expect(config).toBe(d3Config);
    expect(setHighlighted).toBe(defaultProps.setHighlighted);
    expect(quadrantNum).toBe(3);
  });
});
