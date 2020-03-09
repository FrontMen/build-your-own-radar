const sizes = {
  mobile: 480,
  phablet: 481,
  tablet: 768,
  desktop: 1024,
};

export const MediaQueries = {
  phablet: `(min-width: ${sizes.phablet}px)`,
  tablet: `(min-width: ${sizes.tablet}px)`,
  desktop: `(min-width: ${sizes.desktop}px)`,
};
