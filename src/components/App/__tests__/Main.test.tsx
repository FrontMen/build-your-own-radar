import React from 'react';
import { mount } from 'enzyme';
import { GlobalStyle } from 'Theme/GlobalStyles';
import { AllProvidersWrapper } from 'test/helpers';
import { Main } from '../Main';

window.scrollTo = jest.fn();

describe('Main', () => {
  const mainWrapper = mount(<Main />, {
    wrappingComponent: AllProvidersWrapper,
  });

  it('should render Router and GlobalStyle', () => {
    expect(mainWrapper.find(GlobalStyle)).toHaveLength(1);
  });
});
