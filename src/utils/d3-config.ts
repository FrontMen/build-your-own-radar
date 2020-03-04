export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    { name: 'languages & frameworks' },
    { name: 'tools' },
    { name: 'platforms' },
    { name: 'techniques' },
  ],
  rings: [
    { name: 'adopt', color: '#17a2b8', backgroundColor: '#BFC0BF' } as const,
    { name: 'trial', color: '#17a2b8', backgroundColor: '#CBCCCB' } as const,
    { name: 'assess', color: '#17a2b8', backgroundColor: '#D7D8D6' } as const,
    { name: 'hold', color: '#17a2b8', backgroundColor: '#E4E5E4' } as const,
  ],
};
