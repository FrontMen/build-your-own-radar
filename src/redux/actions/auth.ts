import { ActionWithPayload } from 'redux/types';

export enum EAuthActionTypes {
  FETCH_TOKEN = 'auth/FETCH_TOKEN',
  SET_STATUS = 'auth/SET_STATUS',
}

export interface IFetchTokenPayload {
  params: {};
  search: string;
}
export type TFetchToken = ActionWithPayload<
  EAuthActionTypes.FETCH_TOKEN,
  IFetchTokenPayload
>;
const fetchToken = (data: IFetchTokenPayload): TFetchToken =>
  ({
    type: EAuthActionTypes.FETCH_TOKEN,
    payload: data,
  } as const);

export interface ISetAuthStatusPayload {
  error?: string;
  user: any;
  authorized: boolean;
}
export type TSetAuthStatus = ActionWithPayload<
  EAuthActionTypes.SET_STATUS,
  ISetAuthStatusPayload
>;
const setAuthStatus = (data: ISetAuthStatusPayload): TSetAuthStatus => ({
  type: EAuthActionTypes.SET_STATUS,
  payload: data,
});

export const authActions = {
  fetchToken,
  setAuthStatus,
};
