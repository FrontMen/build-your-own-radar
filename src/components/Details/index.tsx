import { loadable } from '../../utils/loadable';
import { DetailsParams } from './Details';

export const Details = loadable<DetailsParams>(() => import('./Details'));
