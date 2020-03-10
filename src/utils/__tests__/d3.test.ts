import { radar_visualization } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';
import { mockData } from 'test/mockData';
import { History } from 'history';

import { fireEvent, getByTestId } from '@testing-library/dom';

const setHighlighted = jest.fn();
const setSelected = jest.fn();

const history = ({
  push: jest.fn(),
} as unknown) as History;

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
      mockData,
      d3Config,
      setHighlighted,
      setSelected,
      {
        quadrant: 0,
      },
      history,
    );

    await new Promise(resolve => {
      setTimeout(resolve, 400);
    });

    const g = getByTestId(svg, mockData[0].name);

    fireEvent(
      g,
      new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(setHighlighted).toHaveBeenCalledWith(mockData[0].name);

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
      mockData,
      d3Config,
      setHighlighted,
      setSelected,
      {
        quadrant: 0,
      },
      history,
    );

    await new Promise(resolve => {
      setTimeout(resolve, 400);
    });

    const g = getByTestId(svg, mockData[0].name);

    fireEvent(
      g,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(setSelected).toHaveBeenCalledWith(mockData[0].name);
  });

  it('should push correct path to history on quadrant click in fullSize mode', async () => {
    // construct svg and append it to js-dom
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'radar');
    document.body.append(svg);

    radar_visualization(
      svg,
      mockData,
      d3Config,
      setHighlighted,
      setSelected,
      {},
      history,
    );

    await new Promise(resolve => {
      setTimeout(resolve, 400);
    });

    const g = getByTestId(svg, 'quadrant-0');

    fireEvent(
      g,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(history.push).toHaveBeenCalledWith(d3Config.quadrants[2].name);
  });
});
