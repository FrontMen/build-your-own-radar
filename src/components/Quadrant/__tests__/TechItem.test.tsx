import React from 'react';
import { mount } from 'enzyme';

import { TechItem, TechnologyProps } from '../TechItem';
import { parsedMockDataItem } from 'test/mockData';
import { withAllProviders, AllProvidersWrapper } from 'test/helpers';
import { createMemoryHistory } from 'history';

const defaultProps: TechnologyProps = {
  highlighted: null,
  technology: parsedMockDataItem[0],
  selected: null,
  setSelected: jest.fn(),
  setHighlighted: jest.fn(),
  quadrant: 'tools',
};

const LabelSelector = {
  'data-testid': 'label',
};

const DetailsSelector = {
  'data-testid': 'details',
};

// used for tests which updates state, to not reinstantiate history obj
const history = createMemoryHistory({ initialEntries: ['/'] });

describe('TechItem', () => {
  it('it should matches the snapshot with default values', () => {
    const { container } = withAllProviders(<TechItem {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('it should highlight label when highlighted property matches current item', () => {
    const wrapper = mount(<TechItem {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: { history },
    });

    let label = wrapper.find(LabelSelector);
    expect(label).toHaveStyleRule('font-weight', '400');

    wrapper.setProps({
      highlighted: parsedMockDataItem[0].positionId,
    });

    label = wrapper.find(LabelSelector);
    expect(label).toHaveStyleRule('font-weight', '600');
  });

  it('it should highlight label when selected property is set', () => {
    const wrapper = mount(<TechItem {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: { history },
    });

    let label = wrapper.find(LabelSelector);
    expect(label).toHaveStyleRule('font-weight', '400');

    wrapper.setProps({
      selected: parsedMockDataItem[0].positionId,
    });

    label = wrapper.find(LabelSelector);
    expect(label).toHaveStyleRule('font-weight', '600');
  });

  it('it should expand details when selected prop matches item label', () => {
    const wrapper = mount<TechnologyProps>(<TechItem {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: { history },
    });

    let details = wrapper.find(DetailsSelector);
    expect(details).toHaveStyleRule('max-height', '0px');

    wrapper.setProps({
      selected: parsedMockDataItem[0].positionId!,
    });

    details = wrapper.find(DetailsSelector);
    expect(details).toHaveStyleRule('max-height', '75vh');
  });

  it('should call setHighlighted callback on mouseOver and mouseOut on item Label', () => {
    const wrapper = mount(<TechItem {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
    });

    wrapper
      .find(LabelSelector)
      .at(0)
      .simulate('mouseOver');
    expect(defaultProps.setHighlighted).toHaveBeenCalledWith(
      parsedMockDataItem[0].positionId,
    );

    wrapper
      .find(LabelSelector)
      .at(0)
      .simulate('mouseOut');
    expect(defaultProps.setHighlighted).toHaveBeenCalledWith(null);
  });

  it('should call setActive callback on Label click', () => {
    const wrapper = mount(<TechItem {...defaultProps} />, {
      wrappingComponent: AllProvidersWrapper,
    });

    wrapper
      .find(LabelSelector)
      .at(0)
      .simulate('click');
    expect(defaultProps.setSelected).toHaveBeenCalledWith(
      `?tech=${parsedMockDataItem[0].positionId}`,
    );
  });
});
