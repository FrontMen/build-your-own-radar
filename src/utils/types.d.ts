interface Polar {
  t: number;
  r: number;
}

interface Point {
  x: number;
  y: number;
}

interface Segment {
  clipx: (d: Point) => number;
  clipy: (d: Point) => number;
  random: () => Point;
}

interface Technology extends Partial<Point> {
  quadrant: number;
  ring: number;
  label: string;
  active: boolean;
  link: string;
  moved: number;
  segment?: Segment;
  color?: string;
  id?: string;
  details?: string;
}

type Segmented = Array<Array<Technology[]>>

interface ListChildComponentPropsWithData<T> {
  index: number;
  style: CSSProperties;
  data: T;
  isScrolling?: boolean;
}
