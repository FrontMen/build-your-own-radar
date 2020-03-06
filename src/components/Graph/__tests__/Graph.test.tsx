import React from 'react';
import { Graph } from 'src/components/Graph';
import { withThemeProviders } from 'test/helpers';
import { mockData } from 'test/mockData';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components/macro';
import { lightTheme } from 'src/Theme';
import { d3Config } from 'src/utils/d3-config';

const defaultProps = {
  technologies: mockData,
  highlighted: null,
  setHighlighted: jest.fn(),
  quadrant: 0,
};

jest.mock('src/utils/d3', () => ({
  radar_visualization: jest.fn(),
  showBubble: jest.fn(),
  hideBubble: jest.fn(),
}));

describe('Graph', () => {
  /* test to check that the mobile and larger snapshot don't change unintentionally */
  it('should matches the snapshot', () => {
    const { container } = withThemeProviders(<Graph {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call showBubble when technology selected and hideBubble when not', async () => {
    const { showBubble, hideBubble } = await import('src/utils/d3');
    const wrapper = mount(<Graph {...defaultProps} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: {
        theme: lightTheme,
      },
    });

    wrapper.setProps({
      highlighted: mockData[0].name,
    });
    expect(showBubble).toHaveBeenCalledWith(mockData[0]);

    wrapper.setProps({
      highlighted: null,
    });
    expect(hideBubble).toHaveBeenCalled();
  });

  it('should call radar_visualization with proper params when technologies or quadrant changes',  async () => {
    const {
      radar_visualization,
    }: {
      radar_visualization: jest.MockedFunction<any>;
    } = await import('src/utils/d3');

    const wrapper = mount(<Graph {...defaultProps} technologies={[]} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: {
        theme: lightTheme,
      },
    });

    wrapper.setProps({
      technologies: mockData,
    });

    const [_, technologies] = radar_visualization.mock.calls[0];
    expect(technologies).toBe(mockData);

    radar_visualization.mockClear();

    wrapper.setProps({
      quadrant: 1,
    });

    const [c, t, config, setHighlighted, { quadrant }] = radar_visualization.mock.calls[0];
    expect(config).toBe(d3Config);
    expect(setHighlighted).toBe(defaultProps.setHighlighted);
    expect(quadrant).toBe(1);

  });
});
