export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    { name: 'Frameworks, CMS & Programmeertalen' },
    { name: 'Tooling en testing' },
    { name: 'Platforms, infrastructure & Data' },
    { name: 'Technieken' },
  ],
  rings: [
    { name: 'Adopt', color: '#17a2b8', backgroundColor: '#BFC0BF' } as const,
    { name: 'Trial', color: '#17a2b8', backgroundColor: '#CBCCCB' } as const,
    { name: 'Assess', color: '#17a2b8', backgroundColor: '#D7D8D6' } as const,
    { name: 'Hold', color: '#17a2b8', backgroundColor: '#E4E5E4' } as const,
  ],
};
