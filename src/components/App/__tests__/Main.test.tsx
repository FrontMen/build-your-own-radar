import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'Router';
import { GlobalStyle } from 'Theme/GlobalStyles';
import { AllProvidersWrapper } from 'test/helpers';
import { Main } from '../Main';

describe('Main', () => {
  const mainWrapper = mount(<Main />, {
    wrappingComponent: AllProvidersWrapper,
  });

  it('should render Router and GlobalStyle', () => {
    expect(mainWrapper.find(Router)).toHaveLength(1);
    expect(mainWrapper.find(GlobalStyle)).toHaveLength(1);
  });
});
