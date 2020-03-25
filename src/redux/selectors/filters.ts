import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/reducers';
import { IFiltersState } from 'src/redux/reducers/filters';

export const filtersStateSelector = (
  state: IRootState,
): IFiltersState => state.filters;

export const selectedCompaniesSelector = createSelector(
  filtersStateSelector,
  ({ companies }) => companies,
);

