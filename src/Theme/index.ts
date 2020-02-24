import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Montserrat', 'Roboto'],
  },
});

export const baseTheme = {
  ModularScale: {
    base: 1,
    ratio: 1.5,
    // TODO: this could be based on the Modular scale at a later point possibly
    lineHeight: [1.65, 1.15],
  },


  space: [0, 4, 8, 16, 32, 64, 128, 256],
  pageWidth: '60em',
  fonts: {
    primary: 'Montserrat, san-serif',
    body: 'Roboto, san-serif',
  },

  pallet: {
    blue: '#526de4',
    indigo: '#532778',
    purple: '#7843ab',
    pink: '#f8bfd1',
    red: '#ff5100',
    orange: '#fd7e14',
    yellow: '#fcea0b',
    green: '#31bd70',
    teal: '#20c997',
    cyan: '#17a2b8',
    white: '#fff',
    gray: '#6c757d',
    grayDark: '#343a40',
    primary: '#526de4',
    secondary: '#767676',
    success: '#31bd70',
    info: '#17a2b8',
    warning: '#fcea0b',
    danger: '#ff5100',
    light: '#f8f9fa',
    dark: '#37383d',
  },
};

export type LightThemeType = {
  readonly [K in keyof typeof lightTheme]: typeof lightTheme[K];
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    body: baseTheme.pallet.grayDark,
    background: baseTheme.pallet.white,
  },
};
