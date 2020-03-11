import { d3Config } from 'src/utils/d3-config';

export type IncomingDataSchema = [
  {
    name: string;
    quadrant: string;
    ring: RingNamesType;
    isNew: 'TRUE' | 'FALSE';
    description: string;
    'ITR BE': string;
    'ITR NL': string;
    FM: string;
    'In radar?'?: 'Y' | 'N';
  },
];

export const DataMapper = (data: IncomingDataSchema): Technology[] => {
  return data
    .filter(item => item['In radar?'] === 'Y')
    .map(({ 'ITR BE': ITR_BE, 'ITR NL': ITR_NL, FM, ...item }) => ({
      ...item,
      moved: 0,
      isNew: item.isNew === 'TRUE',
      quadrant: d3Config.quadrants.findIndex(
        quad => quad.name === item.quadrant,
      ),
      companies: [
        ITR_BE === 'X' ? 'ITR_BE' : false,
        ITR_NL === 'X' ? 'ITR_NL' : false,
        FM === 'X' ? 'FM' : false,
      ].filter(Boolean) as CompanyTypes[],
    }));
};
