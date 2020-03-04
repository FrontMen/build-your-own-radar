export type IncomingDataSchema = [
  {
    name: string;
    ring: 'adopt' | 'trail' | 'assess' | 'hold';
    quadrant: string;
    isNew: 'TRUE' | 'FALSE';
    description: string;
  },
];

export const DataMapper = (data: IncomingDataSchema): Technology[] => {
  return data.map(item => ({
    ...item,
    moved: 0,
    isNew: item.isNew === 'TRUE' ? true : false,
  }));
};
