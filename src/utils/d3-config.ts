import { baseTheme } from '../Theme/index';

export const d3Config = {
  svg_id: 'radar',
  colors: {
    background: 'none',
    grid: '#bbb',
    inactive: '#ddd',
  },
  quadrants: [
    { name: 'Frameworks, CMS & Programmeertalen', color: baseTheme.pallet.green },
    { name: 'Tooling en testing', color: baseTheme.pallet.cyan },
    { name: 'Platforms, infrastructure & Data', color: baseTheme.pallet.orange },
    { name: 'Technieken', color: baseTheme.pallet.purple },
  ],
  rings: [
    { name: 'Adopt', color: '#17a2b8', backgroundColor: '#BFC0BF' } as const,
    { name: 'Trial', color: '#17a2b8', backgroundColor: '#CBCCCB' } as const,
    { name: 'Assess', color: '#17a2b8', backgroundColor: '#D7D8D6' } as const,
    { name: 'Hold', color: '#17a2b8', backgroundColor: '#E4E5E4' } as const,
  ],
};
