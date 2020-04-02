import { Reducer } from 'redux';
import { TActions } from 'redux/types';
import { ETechnologiesActionTypes } from 'redux/actions/technologies';

export interface ITechnologiesState {
  data: ParsedGoogleSheets;
  initialized: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
export const defaultState: ITechnologiesState = {
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
