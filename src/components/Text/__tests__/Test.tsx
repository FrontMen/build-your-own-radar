import React from 'react';
import { Text } from '../';
import { mount } from 'enzyme';
import { TranslationWrapper } from 'test/helpers';

describe('DataSetFilter', () => {
  it('should render correctly', () => {
    const Container = TranslationWrapper(<Text />);

    expect(Container).toBeTruthy();
    expect(Container).toMatchSnapshot();
  });

  it('should default to span tag when tag property is not set', () => {
    const wrapper = mount(TranslationWrapper(<Text />));

    expect(wrapper.find('span')).toHaveLength(1);

    wrapper.unmount();
  });

  it('should render the tag according to the tag property', () => {
    const wrapper = mount(TranslationWrapper(<Text tag="p" />));

    expect(wrapper.find('p')).toHaveLength(1);

    wrapper.unmount();
  });
});
