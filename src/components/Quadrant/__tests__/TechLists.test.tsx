import React from 'react';
import { mount } from 'enzyme';

import { TechLists, TechnologiesListProps } from '../TechLists';
import { TechItem } from '../TechItem';
import { mockData } from 'test/mockData';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';

const defaultProps: TechnologiesListProps = {
  highlighted: null,
  setHighlighted: jest.fn(),
  setSelected: jest.fn(),
  technologies: mockData,
  quadrant: 'tools',
  selected: null,
};

describe('TechLists', () => {
  test('it should matches the snapshot with default values', () => {
    const { container } = withAllProviders(<TechLists {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('it should pass down highlighted and setHighlighted props to list items', () => {
    const wrapper = mount(<TechLists {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
    });

    const label = wrapper.find(TechItem).first();

    expect(label.prop('highlighted')).toBe(defaultProps.highlighted);
    expect(label.prop('setHighlighted')).toBe(defaultProps.setHighlighted);
  });
});
