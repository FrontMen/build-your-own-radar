import React from 'react';
import { mount } from 'enzyme';
import { lightTheme } from 'src/Theme';

import { TechLists, TechnologiesListProps } from '../TechLists';
import { TechItem } from '../TechItem';
import { mockData } from 'test/mockData';
import { withThemeProviders } from 'test/helpers';

import { ThemeProvider } from 'styled-components/macro';

const defaultProps: TechnologiesListProps = {
  highlighted: null,
  setHighlighted: jest.fn(),
  technologies: mockData,
  quadrant: 0,
};

describe('TechLists', () => {
  test('it should matches the snapshot with default values', () => {
    const { container } =  withThemeProviders(<TechLists {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('it should pass down highlighted and setHighlighted props to list items', () => {
    const wrapper = mount(
      <TechLists {...defaultProps} />, {
        wrappingComponent: ThemeProvider,
        wrappingComponentProps: {
          theme: lightTheme
        }
      }
    );

    const label = wrapper.find(TechItem).first();

    expect(label.prop('highlighted')).toBe(defaultProps.highlighted);
    expect(label.prop('setHighlighted')).toBe(defaultProps.setHighlighted);
  });

});
