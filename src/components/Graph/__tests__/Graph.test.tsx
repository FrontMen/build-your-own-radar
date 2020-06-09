import React from 'react';
import { Graph, GraphProps } from 'components/Graph';
import { withAllProviders, AllProvidersWrapper } from 'test/helpers';
import { blips } from 'test/mockData';
import { mount } from 'enzyme';
import { d3Config } from 'utils/d3-config';
import { createMemoryHistory } from 'history';

const defaultProps = {
  blips,
  highlighted: null,
  setHighlighted: jest.fn(),
  setSelected: jest.fn(),
  quadrantNum: 1,
};
jest.mock('utils/d3', () => {
  const actual = jest.requireActual('utils/d3');
  return {
    ...actual,
    radar_visualization: jest.fn(),
    showBubble: jest.fn(),
    hideBubble: jest.fn(),
  };
});

const defer = async () => new Promise(r => setTimeout(r, 0));

describe('Graph', () => {
  /* test to check that the mobile and larger snapshot don't change unintentionally */
  it('should matches the snapshot', () => {
    const { container } = withAllProviders(<Graph {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should call showBubble when technology selected and hideBubble when not', async () => {
    const { showBubble, hideBubble } = await import('utils/d3');
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const wrapper = mount<GraphProps>(<Graph {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: {
        history,
      },
    });

    wrapper.setProps({
      highlighted: blips[0].positionId!,
    });
    expect(showBubble).toHaveBeenCalledWith(blips[0], 1);

    wrapper.setProps({
      highlighted: null,
    });
    expect(hideBubble).toHaveBeenCalled();
  });

  it('should call radar_visualization with proper params when technologies or quadrant changes', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const {
      radar_visualization,
    }: {
      radar_visualization: jest.MockedFunction<any>;
    } = await import('utils/d3');
    const wrapper = mount<GraphProps>(<Graph {...defaultProps} blips={[]} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: {
        history,
      },
    });

    wrapper.setProps({
      blips,
    });

    await defer();
    const [_, b] = radar_visualization.mock.calls[1];
    expect(b).toBe(blips);

    radar_visualization.mockClear();

    wrapper.setProps({
      quadrantNum: 3,
    });

    await defer();
    const [
      container,
      bl,
      changed,
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
