export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    { name: 'Languages' },
    { name: 'Infrastructure' },
    { name: 'Frameworks' },
    { name: 'Data Management' },
  ],
  rings: [
    { name: 'ADOPT', color: '#17a2b8', backgroundColor: '#BFC0BF'}  as const,
    { name: 'TRIAL', color: '#17a2b8', backgroundColor: '#CBCCCB' } as const,
    { name: 'ASSESS', color: '#17a2b8', backgroundColor: '#D7D8D6'} as const,
    { name: 'HOLD', color: '#17a2b8', backgroundColor: '#E4E5E4' } as const,
  ],
};
