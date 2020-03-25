import { createSelector } from 'reselect';
import { IRootState } from 'redux/reducers';
import { ITechnologiesState } from 'redux/reducers/technologies';

export const technologiesStateSelector = (
  state: IRootState,
): ITechnologiesState => state.technologies;

export const technologiesLoadingStateSelector = createSelector(
  technologiesStateSelector,
  ({ loading, error, errorMessage, initialized }) => ({
    loading,
    error,
    errorMessage,
    initialized,
  }),
);

export const selectedTechnologyDataSetSelector = createSelector(
  technologiesStateSelector,
  (state: IRootState) => ({
    selected: state.filters.dataSet.selected,
  }),
  ({ data }, { selected }) => (selected === null ? [] : data[selected]),
);
