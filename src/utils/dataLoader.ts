export type IncomingDataSchema = [
  {
    name: string;
    ring: RingNamesType;
    quadrant: string;
    isNew: 'TRUE' | 'FALSE';
    description: string;
  },
];

export const DataMapper = (data: IncomingDataSchema): Technology[] => {
  return data.map(item => ({
    ...item,
    moved: 0,
    isNew: item.isNew === 'TRUE',
  }));
};
