import { Action } from 'redux';
import { ActionWithError, ActionWithPayload } from 'redux/types';

export enum ETechnologiesActionTypes {
  FETCH_TECHNOLOGIES = 'technologies/fetch-technologies',
  FETCH_TECHNOLOGIES_SUCCESS = 'technologies/fetch-technologies-success',
  FETCH_TECHNOLOGIES_ERROR = 'technologies/fetch-technologies-error',
}

export type TFetchTechnologies = Action<
  ETechnologiesActionTypes.FETCH_TECHNOLOGIES
>;
const fetchTechnologies = (): TFetchTechnologies =>
  ({
    type: ETechnologiesActionTypes.FETCH_TECHNOLOGIES,
  } as const);

export type TFetchTechnologiesSuccess = ActionWithPayload<
  ETechnologiesActionTypes.FETCH_TECHNOLOGIES_SUCCESS,
  ParsedGoogleSheets
>;
const fetchTechnologiesSuccess = (
  data: ParsedGoogleSheets,
): TFetchTechnologiesSuccess => ({
  type: ETechnologiesActionTypes.FETCH_TECHNOLOGIES_SUCCESS,
  payload: data,
});

export type TFetchTechnologiesError = ActionWithError<
  ETechnologiesActionTypes.FETCH_TECHNOLOGIES_ERROR
>;
const fetchTechnologiesError = (error: Error): TFetchTechnologiesError => ({
  type: ETechnologiesActionTypes.FETCH_TECHNOLOGIES_ERROR,
  error,
});

export const technologiesActions = {
  fetchTechnologies,
  fetchTechnologiesSuccess,
  fetchTechnologiesError,
};
