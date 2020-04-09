import { radar_visualization } from 'utils/d3';
import { d3Config } from 'utils/d3-config';
import { parsedMockDataItem } from 'test/mockData';

import { fireEvent, getByTestId } from '@testing-library/dom';

const setHighlighted = jest.fn();
const setSelected = jest.fn();
const redirect = jest.fn();
const setHoveredQuadrant = jest.fn();

describe('d3', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should call setHighlighted callback on mouse over and mouseout', async () => {
    // construct svg and append it to js-dom
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'radar');
    document.body.append(svg);

    radar_visualization(
      svg,
      parsedMockDataItem,
      d3Config,
      setHighlighted,
      setSelected,
      setHoveredQuadrant,
      {
        isNotMobile: true,
        quadrantNum: 0,
      },
      redirect,
    );

    const g = getByTestId(svg, parsedMockDataItem[0].name);

    fireEvent(
      g,
      new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(setHighlighted).toHaveBeenCalledWith(
      parsedMockDataItem[0].positionId,
    );

    fireEvent(
      g,
      new MouseEvent('mouseout', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(setHighlighted).toHaveBeenCalledWith(null);
  });

  it('should call setSelected callback on click', async () => {
    // construct svg and append it to js-dom
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'radar');
    document.body.append(svg);

    radar_visualization(
      svg,
      parsedMockDataItem,
      d3Config,
      setHighlighted,
      setSelected,
      setHoveredQuadrant,
      {
        quadrantNum: 0,
        isNotMobile: true,
      },
      redirect,
    );

    const g = getByTestId(svg, parsedMockDataItem[0].name);

    fireEvent(
      g,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(setSelected).toHaveBeenCalledWith(
      `?tech=${parsedMockDataItem[0].positionId}`,
    );
  });

  it('should push correct path to history on quadrant click in fullSize mode', async () => {
    // construct svg and append it to js-dom
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'radar');
    document.body.append(svg);

    radar_visualization(
      svg,
      parsedMockDataItem,
      d3Config,
      setHighlighted,
      setSelected,
      setHoveredQuadrant,
      { isNotMobile: true },
      redirect,
    );

    const g = getByTestId(svg, 'quadrant-0');

    fireEvent(
      g,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(redirect).toHaveBeenCalledWith(d3Config.quadrants[2].route);
  });
});
