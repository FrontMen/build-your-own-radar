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

export const dateFormat = (date: string) => {
  if (isNaN(Date.parse(date))) return '';

  return new Date(date).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });
};
