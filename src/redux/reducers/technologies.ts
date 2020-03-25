import { Reducer } from 'redux';
import { TActions } from 'src/redux/types';
import { ETechnologiesActionTypes } from 'src/redux/actions/technologies';
import { ParsedGoogleSheets } from 'src/utils/dataParser';

export interface ITechnologiesState {
  data: ParsedGoogleSheets;
  initialized: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
const defaultState: ITechnologiesState = {
  data: {},
  initialized: false,
  loading: false,
  error: false,
  errorMessage: '',
};

export const technologiesReducer: Reducer<ITechnologiesState, TActions> = (
  state = defaultState,
  action,
): ITechnologiesState => {
  switch (action.type) {
    case ETechnologiesActionTypes.FETCH_TECHNOLOGIES: {
      return {
        ...state,
        initialized: true,
        loading: true,
      };
    }

    case ETechnologiesActionTypes.FETCH_TECHNOLOGIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        errorMessage: '',
      };

    case ETechnologiesActionTypes.FETCH_TECHNOLOGIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error.message,
      };

    default:
      return state;
  }
};
