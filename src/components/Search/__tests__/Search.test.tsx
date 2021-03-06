import React from 'react';
import { Search } from '..';
import {
  withAllProviders,
  AllProvidersWrapper,
  getSelector,
} from 'test/helpers';
import { mount } from 'enzyme';
import { rootStateBuilder, storeCreator } from 'test/builders';
import { parsedTechData } from 'test/mockData';

const setSelected = jest.fn();

const inputSelector = getSelector('search-input');
const dropdownSelector = getSelector('search-content');

describe('Search', () => {
  /* test to check that the mobile and larger snapshot don't change unintentionally */
  it('render search icon and input field', () => {
    const { container, getByTestId } = withAllProviders(
      <Search setSelected={setSelected} />,
    );

    expect(getByTestId('search-icon')).toBeTruthy();
    expect(getByTestId('search-input')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render dropdown if input has a matching value', () => {
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
      },
    });
    const store = storeCreator(state);

    const wrapper = mount(<Search setSelected={setSelected} />, {
      wrappingComponent: AllProvidersWrapper,
      wrappingComponentProps: {
        store,
      },
    });

    //there should not be dropdown when input is empty
    expect(wrapper.find(dropdownSelector).at(0)).toHaveLength(0);

    wrapper
      .find(inputSelector)
      .at(0)
      .simulate('change', {
        target: {
          value: 'Alpine',
        },
      });

    let dropdown = wrapper.find(dropdownSelector).at(0);

    expect(dropdown).toHaveLength(1);
    expect(
      dropdown.at(0).find(getSelector('search-ringName')).length,
    ).toBeGreaterThan(0);
    expect(
      dropdown.at(0).find(getSelector('search-technology')).length,
    ).toBeGreaterThan(0);

    wrapper
      .find(inputSelector)
      .at(0)
      .simulate('change', {
        target: {
          value: 'there is no matching technology with such name',
        },
      });

    //there should not be dropdown when there are no matching technologies
    dropdown = wrapper.find(dropdownSelector).at(0);

    expect(dropdown).toHaveLength(0);
  });
});
