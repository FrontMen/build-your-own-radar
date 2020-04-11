import { filtersActions } from './filters';
import { technologiesActions } from './technologies';
import { d3Actions } from './d3';

export const actions = {
  ...filtersActions,
  ...technologiesActions,
  ...d3Actions,
};
