import React from 'react';
import { DataSetFilter } from '../';
import { withAllProviders } from 'test/helpers';
import { storeCreator, filtersStateBuilder } from 'test/builders';
import { lightTheme } from 'Theme';

describe('DataSetFilter', () => {
  const availableDates = ['date1', 'date2'];
  it('should render correctly when dataset is empty', () => {
    const { container, getByTestId, queryByTestId } = withAllProviders(
      <DataSetFilter />,
    );

    expect(getByTestId('dataSetFilter-anchor')).toBeTruthy();
    expect(getByTestId('dataSetFilter-text')).toHaveTextContent('');
    expect(queryByTestId('dataSetFilter-dropdown')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when data is there', () => {
    const state = filtersStateBuilder({
      dataSet: {
        availableDates,
        selected: availableDates[0],
      },
    });
    const store = storeCreator(state);
    const { container, getByTestId } = withAllProviders(<DataSetFilter />, {
      store,
    });

    expect(getByTestId('dataSetFilter-text')).toHaveTextContent(
      availableDates[0],
    );
    expect(container).toMatchSnapshot();
  });

  it('should render dropdown when text is clicked', () => {
    const selectedIndex = 0;
    const state = filtersStateBuilder({
      dataSet: {
        availableDates,
        selected: availableDates[selectedIndex],
      },
    });
    const store = storeCreator(state);
    const { container, getByTestId } = withAllProviders(<DataSetFilter />, {
      store,
    });

    getByTestId('dataSetFilter-anchor').click();

    expect(getByTestId('dataSetFilter-dropdown')).toBeTruthy();
    expect(container).toMatchSnapshot();
    availableDates.forEach((date, index) => {
      expect(
        getByTestId(`dataSetFilter-dropdown-option-${date}`),
      ).toHaveStyleRule(
        'background-color',
        index === selectedIndex
          ? lightTheme.pallet.primary
          : lightTheme.pallet.white,
      );
      expect(
        getByTestId(`dataSetFilter-dropdown-option-${date}`),
      ).toHaveTextContent(date);
      expect(
        getByTestId(`dataSetFilter-dropdown-option-${date}`),
      ).toHaveTextContent(date);
    });
  });
});
