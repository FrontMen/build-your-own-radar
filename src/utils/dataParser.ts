import { d3Config } from 'utils/d3-config';
import Groupby from 'lodash.groupby';

const ARRAY_LENGTH = 4;
const ringsOrder = Object.keys(d3Config.rings).reduce(
  (acc: any, ring: string, index: number) => {
    acc[ring] = index;
    return acc;
  },
  {},
);

const initNewCounter = () =>
  [...Array(ARRAY_LENGTH)].map(() => [...Array(ARRAY_LENGTH)].map(() => 0));

export const mapDatabaseEntries = (technologies: Technology[]) => {
  const groupedTechnologies = Groupby(technologies, 'publishedAt');

  Object.keys(groupedTechnologies).forEach(date => {
    const datedTechs = groupedTechnologies[date];
    const cumulativeCounter = countAll(datedTechs);
    const newCounter = initNewCounter();

    datedTechs.forEach(item => {
      const { ring, quadrant } = item;
      const ringOrder = ringsOrder[ring.name];
      const startFrom = cumulativeCounter[quadrant.order][ringOrder];
      const currentIndex = ++newCounter[quadrant.order][ringOrder];
      item.positionId = item.id;
      item.id = `${startFrom + currentIndex}`;
    });
  });

  return groupedTechnologies;
};

const countAll = (data: Technology[]) => {
  const counter = initNewCounter();

  data.forEach(item => {
    const ringOrder = ringsOrder[item.ring.name];
    for (let i = ringOrder + 1; i < ARRAY_LENGTH; i++) {
      // Cumulate the count
      counter[item.quadrant.order][i]++;
    }
  });

  return counter;
};
