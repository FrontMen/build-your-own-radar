import { IRootState } from 'redux/reducers';
import { IAuthState } from 'redux/reducers/auth';

export const authStateSelector = (state: IRootState): IAuthState => state.auth;
