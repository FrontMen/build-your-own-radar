import { Action } from 'redux';
import { ActionWithError, ActionWithPayload } from 'redux/types';

export enum ECompaniesActionTypes {
  FETCH_COMPANIES = 'companies/fetch-companies',
  FETCH_COMPANIES_SUCCESS = 'companies/fetch-companies-success',
  FETCH_COMPANIES_ERROR = 'companies/fetch-companies-error',
}

export type TFetchCompanies = Action<
  ECompaniesActionTypes.FETCH_COMPANIES
>;
const fetchCompanies = (): TFetchCompanies =>
  ({
    type: ECompaniesActionTypes.FETCH_COMPANIES,
  } as const);

export type TFetchCompaniesSuccess = ActionWithPayload<
  ECompaniesActionTypes.FETCH_COMPANIES_SUCCESS,
  Company[]
>;
const fetchCompaniesSuccess = (
  data: Company[],
): TFetchCompaniesSuccess => ({
  type: ECompaniesActionTypes.FETCH_COMPANIES_SUCCESS,
  payload: data,
});

export type TFetchCompaniesError = ActionWithError<
  ECompaniesActionTypes.FETCH_COMPANIES_ERROR
>;
const fetchCompaniesError = (error: Error): TFetchCompaniesError => ({
  type: ECompaniesActionTypes.FETCH_COMPANIES_ERROR,
  error,
});

export const companiesActions = {
  fetchCompanies,
  fetchCompaniesSuccess,
  fetchCompaniesError,
};
