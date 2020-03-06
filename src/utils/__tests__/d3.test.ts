import { radar_visualization } from 'src/utils/d3';
import { d3Config } from 'src/utils/d3-config';
import { mockData } from 'test/mockData';

import { fireEvent, getByTestId } from '@testing-library/dom';

const setHighlighted = jest.fn();
const setSelected = jest.fn();

describe('d3', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should call setHighlighted callback on mouse over and mouseout', async () => {
    // construct svg and append it to js-dom
    const svg = document.createElement('svg');
    svg.setAttribute('id', 'radar');
    document.body.append(svg);

    radar_visualization(svg, mockData, d3Config, setHighlighted, setSelected, {
      width: 100,
      height: 100,
      quadrant: 0,
    });

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

    radar_visualization(svg, mockData, d3Config, setHighlighted, setSelected, {
      width: 100,
      height: 100,
      quadrant: 0,
    });

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
});
