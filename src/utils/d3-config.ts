import { baseTheme } from '../Theme'; //relative import due to cypress incorrect resolution

export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    {
      route: 'frameworks-and-lang',
      name: 'Frameworks, CMS & Programmeertalen',
      color: baseTheme.pallet.green,
    },
    {
      route: 'tooling-and-testing',
      name: 'Tooling en testing',
      color: baseTheme.pallet.cyan,
    },
    {
      route: 'platforms-infra-and-data',
      name: 'Platforms, infrastructure & Data',
      color: baseTheme.pallet.orange,
    },
    { route: 'technique', name: 'Technieken', color: baseTheme.pallet.purple },
  ],
  rings: {
    Adopt: { color: '#17a2b8', backgroundColor: '#BFC0BF', num: 0 } as const,
    Trial: { color: '#17a2b8', backgroundColor: '#CBCCCB', num: 1 } as const,
    Assess: { color: '#17a2b8', backgroundColor: '#D7D8D6', num: 2 } as const,
    Hold: { color: '#17a2b8', backgroundColor: '#E4E5E4', num: 3 } as const,
  },
};
