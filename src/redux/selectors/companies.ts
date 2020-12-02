import { createSelector } from 'reselect';
import { IRootState } from 'redux/reducers';
import { ICompaniesState } from 'redux/reducers/companies';

export const companiesStateSelector = (
  state: IRootState,
): ICompaniesState => state.companies;

export const companiesLoadingStateSelector = () => createSelector(
  companiesStateSelector,
  ({ loading, error, errorMessage, initialized }) => ({
    loading,
    error,
    errorMessage,
    initialized,
  }),
);

export const allCompanyDataSetSelector = createSelector(
  companiesStateSelector,
  ({ data }) => data,
);
