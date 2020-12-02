import { filtersActions } from './filters';
import { technologiesActions } from './technologies';
import { companiesActions } from './companies';
import { d3Actions } from './d3';
import { authActions } from './auth';

export const actions = {
  ...filtersActions,
  ...technologiesActions,
  ...companiesActions,
  ...d3Actions,
  ...authActions,
};
