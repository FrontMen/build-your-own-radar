import { Action } from 'redux';
import { actions } from './actions';

export type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P;
};

export type ActionWithError<T extends string, E extends Error = Error> = Action<
  T
> & {
  error: E;
};

export type TActions = {
  [K in keyof typeof actions]: ReturnType<typeof actions[K]>;
}[keyof typeof actions];
