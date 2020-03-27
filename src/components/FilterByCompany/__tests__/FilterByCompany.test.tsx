import React from 'react';
import { FilterByCompany } from '..';
import { AllProvidersWrapper, withAllProviders } from 'test/helpers';
import { mount } from 'enzyme';
import { rootStateBuilder, storeCreator } from 'test/builders';
import { filtersActions } from 'src/redux/actions/filters';
import { COMPANY_NAMES } from 'src/components/FilterByCompany/config';

describe('FilterByCompany', () => {
  it('should matches the snapshot', () => {
    const { container } = withAllProviders(<FilterByCompany />);
    expect(container).toMatchSnapshot();
  });

  it('should dispatch toggle action on checkbox click', () => {
    (Object.keys(COMPANY_NAMES) as CompanyTypes[]).forEach(companyName => {
      const store = storeCreator(rootStateBuilder());
      const wrapper = mount(<FilterByCompany />, {
        wrappingComponent: AllProvidersWrapper,
        wrappingComponentProps: {
          store,
        },
      });
      wrapper.find({ dataTestid: companyName }).prop('onClick')();
      expect(store.getActions()).toEqual([
        filtersActions.toggleCompany(companyName),
      ]);
    });
  });
});
