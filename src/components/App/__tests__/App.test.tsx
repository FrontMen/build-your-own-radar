import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '../index';
import { Router } from '../../../Router';

describe('App', () => {
  const wrapper: ReactWrapper = mount(<App />);

  it('should have Router', () => {
    expect(wrapper.find(Router)).toBeTruthy();
  });
});
