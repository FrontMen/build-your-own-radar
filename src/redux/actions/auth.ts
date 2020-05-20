import { ActionWithPayload } from 'redux/types';

export enum EAuthActionTypes {
  FETCH_TOKEN = 'auth/FETCH_TOKEN',
}

export interface IAuthAction {
  params: {};
  search: string;
}

export type TFetchToken = ActionWithPayload<
  EAuthActionTypes.FETCH_TOKEN,
  IAuthAction
>;
const fetchToken = (action: IAuthAction): TFetchToken =>
  ({
    type: EAuthActionTypes.FETCH_TOKEN,
    payload: action,
  } as const);

export const authActions = {
  fetchToken,
};
