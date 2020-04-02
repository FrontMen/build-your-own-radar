import { createSelector } from 'reselect';
import { IRootState } from 'redux/reducers';
import { IFiltersState } from 'redux/reducers/filters';

export const filtersStateSelector = (state: IRootState): IFiltersState =>
  state.filters;

export const selectedCompaniesSelector = createSelector(
  filtersStateSelector,
  ({ companies }) => companies,
);

export const selectedDataSetSelector = createSelector(
  filtersStateSelector,
  ({ dataSet }) => dataSet,
);
