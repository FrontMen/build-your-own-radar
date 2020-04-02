import { Reducer, combineReducers } from 'redux';
import { filtersReducer, IFiltersState, defaultState as defaultFiltersState } from 'redux/reducers/filters';
import { technologiesReducer, ITechnologiesState, defaultState as defaultTechnologiesState  } from 'redux/reducers/technologies';
import { TActions } from 'redux/types';

export interface IRootState {
  filters: IFiltersState;
  technologies: ITechnologiesState;
}

export const defaultRootState = {
  filters: defaultFiltersState,
  technologies: defaultTechnologiesState
};

export const rootReducer: Reducer<IRootState, TActions> = combineReducers({
  filters: filtersReducer,
  technologies: technologiesReducer,
});
