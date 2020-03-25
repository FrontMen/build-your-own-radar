import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'src/Router';
import { AllProvidersWrapper } from 'test/helpers';
import { Main } from '../Main';

describe('Main', () => {
  const mainWrapper = mount(<Main />, {
    wrappingComponent: AllProvidersWrapper,
  });
  it('should render Router and GlobalStyle', () => {
    expect(mainWrapper.find(Router)).toBeTruthy();
    expect(mainWrapper.find('GlobalStyle')).toBeTruthy();
  });
});
