import React from 'react';
import { mount } from 'enzyme';
import { lightTheme } from 'src/Theme';

import { TechItem, TechnologyProps, Label, Details } from '../TechItem';
import { mockData } from 'test/mockData';
import { withThemeProviders } from 'test/helpers';

import { ThemeProvider } from 'styled-components/macro';

const defaultProps: TechnologyProps = {
  highlighted: null,
  technology: mockData[0],
  active: null,
  setActive: jest.fn(),
  setHighlighted: jest.fn(),
};

describe('TechItem', () => {
  test('it should matches the snapshot with default values', () => {
    const { container } =  withThemeProviders(<TechItem {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  test('it should highlight label when highlighted property matches current item', () => {
    const wrapper = mount(
      <TechItem {...defaultProps} />, {
        wrappingComponent: ThemeProvider,
        wrappingComponentProps: {
          theme: lightTheme
        }
      }
    );

    let label = wrapper.find(Label);
    expect(label).toHaveStyleRule('font-weight', '400');

    wrapper.setProps({
      highlighted: mockData[0].label,
    });

    label = wrapper.find(Label);
    expect(label).toHaveStyleRule('font-weight', '600');
  });

  test('it should expand details when active prop matches item label', () => {
    const wrapper = mount(
      <TechItem {...defaultProps} />, {
        wrappingComponent: ThemeProvider,
        wrappingComponentProps: {
          theme: lightTheme
        }
      }
    );

    let details = wrapper.find(Details);
    expect(details).toHaveStyleRule('max-height', '0px');

    wrapper.setProps({
      active: mockData[0].label,
    });

    details = wrapper.find(Details);
    expect(details).toHaveStyleRule('max-height', '75vh');
  });

  it('should call setHighlighted callback on mouseOver and mouseOut on item Label',  () => {
    const wrapper = mount(
      <TechItem {...defaultProps} />, {
        wrappingComponent: ThemeProvider,
        wrappingComponentProps: {
          theme: lightTheme
        }
      }
    );

    wrapper.find(Label).simulate('mouseOver');
    expect(defaultProps.setHighlighted).toHaveBeenCalledWith(mockData[0].label);

    wrapper.find(Label).simulate('mouseOut');
    expect(defaultProps.setHighlighted).toHaveBeenCalledWith(null);
  });

  it('should call setActive callback on Label click',  () => {
    const wrapper = mount(
      <TechItem {...defaultProps} />, {
        wrappingComponent: ThemeProvider,
        wrappingComponentProps: {
          theme: lightTheme
        }
      }
    );

    wrapper.find(Label).simulate('click');
    expect(defaultProps.setActive).toHaveBeenCalledWith(mockData[0].label);
  });

});
