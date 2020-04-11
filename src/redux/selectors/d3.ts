import { createSelector } from 'reselect';
import { IRootState } from 'redux/reducers';
import { ID3State } from 'redux/reducers/d3';
import { selectedDataSetSelector } from 'redux/selectors/filters';
import { allTechnologyDataSetSelector } from 'redux/selectors/technologies';

export const d3StateSelector = (state: IRootState): ID3State => state.d3;

export const blipsSelector = () =>
  createSelector(d3StateSelector, ({ blips }) => blips);

export const changedTechnologiesSelector = createSelector(
  selectedDataSetSelector,
  blipsSelector(),
  allTechnologyDataSetSelector,
  ({ selected, prevSelected }, blips, allTechnologies) => {
    if (!selected || !prevSelected) {
      return [];
    }
    const prevTechs = allTechnologies[prevSelected];
    return allTechnologies[selected].filter(s => {
      const prev = prevTechs.find(p => p.name === s.name);
      return !!prev && s.ring !== prev.ring;
    });
  },
);
