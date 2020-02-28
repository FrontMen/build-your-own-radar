export const config = {
  svg_id: 'radar',
  width: 1450,
  height: 1000,
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
    { name: 'ADOPT', color: '#17a2b8', backgroundColor: '#BFC0BF'},
    { name: 'TRIAL', color: '#17a2b8', backgroundColor: '#CBCCCB' },
    { name: 'ASSESS', color: '#17a2b8', backgroundColor: '#D7D8D6'},
    { name: 'HOLD', color: '#17a2b8', backgroundColor: '#E4E5E4' },
  ],
  // zoomed_quadrant: 1,
};
