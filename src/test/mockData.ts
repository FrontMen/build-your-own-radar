import { mapDatabaseEntries } from 'utils/dataParser';
import { convertTechToBlips } from 'redux/sagas/d3';

export const MockTechData: Technology[] = [
  {
    id: '1',
    name: 'A-Frame',
    description: 'A web framework for building virtual reality experiences',
    isNew: false,
    companies: [{ name: 'Frontmen', shortName: 'FM' }],
    inRadar: true,
    moved: 2,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Frameworks, CMS & Programmeertalen',
      color: '#31bd70',
      order: 0,
      localName: 'framwork',
    },
    ring: {
      name: 'Assess',
      order: 2,
      backgroundColor: '#D7D8D6',
    },
  },
  {
    id: '2',
    name: 'Alpine',
    description: '',
    isNew: true,
    moved: 0,
    companies: [{ shortName: 'ITR_NL', name: 'Intracto Netherlands' }],
    inRadar: true,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Platforms, infrastructure & Data',
      color: '#fd7e14',
      order: 2,
    },
    ring: {
      name: 'Adopt',
      order: 0,
      backgroundColor: '#BFC0BF',
    },
  },
  {
    id: '3',
    name: 'React-hooks',
    description: '',
    isNew: true,
    moved: 0,
    companies: [{ shortName: 'ITR_NL', name: 'Intracto Netherlands' }],
    inRadar: true,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Techniques',
      color: '#fd7e14',
      order: 3,
    },
    ring: {
      name: 'Adopt',
      order: 0,
      backgroundColor: '#BFC0BF',
    },
  },
];

export const mockQuadrants = [
  { name: 'Frameworks, CMS & Programmeertalen', order: 0 },
  { name: 'Tooling en testing', order: 1 },
  { name: 'Platforms, infrastructure & Data', order: 2 },
  { name: 'Technieken', order: 3 },
];

export const parsedTechData = mapDatabaseEntries(MockTechData);
export const parsedTechDataItem = Object.values(parsedTechData)[0];
export const blips = convertTechToBlips(Object.values(parsedTechData)[0]);
