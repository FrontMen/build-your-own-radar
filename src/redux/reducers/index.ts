import { Reducer, combineReducers } from 'redux';
import { filtersReducer, IFiltersState } from 'src/redux/reducers/filters';
import { technologiesReducer, ITechnologiesState } from 'src/redux/reducers/technologies';
import { TActions } from 'src/redux/types';

export interface IRootState {
  filters: IFiltersState;
  technologies: ITechnologiesState
}

export const rootReducer: Reducer<IRootState, TActions> = combineReducers({
  filters: filtersReducer,
  technologies: technologiesReducer,
});
