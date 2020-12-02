import intractoLogo from 'res/svg/intracto.svg';

export const random_between = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const polar = ({ x, y }: Point): Polar => ({
  t: Math.atan2(y, x),
  r: Math.sqrt(x * x + y * y),
});

export const cartesian = ({ r, t }: Polar): Point => ({
  x: r * Math.cos(t),
  y: r * Math.sin(t),
});

export const bounded_interval = (
  value: number,
  min: number,
  max: number,
): number => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.min(Math.max(value, low), high);
};

export const dateFormat = (date: string | null) => {
  if (!date || isNaN(Date.parse(date))) return '';

  return new Date(date)
    .toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    })
    .replace(/ /g, ', ');
};

export const transMapper = ['framework', 'tooling', 'platform', 'techniques'];

export const getSrc = (shortName: string) => {
  switch (shortName) {
    case 'FM':
      return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 106'%3E%3Cpath fill='%23201E33' d='M0 0h80v60H0z'/%3E%3Cpath fill='%231F1D32' d='M40.07 0L0 23.16v59.674L39.97 106 80 82.676V23.16z'/%3E%3Cpath fill='%23FFF' d='M10 29v48.49L19.333 83V65.44L38 76.462v-11.02L19.333 54.42v-8.919L38 56.551v-11.02z'/%3E%3Cpath fill='%23FF5900' d='M42 45.53v11.021l18.667-11.02V83L70 77.49V29z'/%3E%3Cpath fill='%230CC' d='M14 26.473L23.464 32 40.5 22.053 57.536 32 67 26.473 40.5 11z'/%3E%3C/svg%3E";
    case 'ITR_BE':
      return intractoLogo;
    case 'ITR_NL':
      return intractoLogo;
  }
};
