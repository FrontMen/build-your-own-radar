import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../index';

describe('App', () => {
  const appWrapper = shallow(<App />);

  it('should wrap content into redux and theme providers', () => {
    expect(appWrapper.find('Provider')).toBeTruthy();
    expect(appWrapper.find('ThemeProvider')).toBeTruthy();
  });
});
