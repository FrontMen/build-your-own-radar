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
  name: string;
  ring: 'adopt' | 'trail' | 'assess' | 'hold';
  quadrant: string;
  isNew: boolean;
  description: string;

  /*
  active: boolean;
  link: string; 
  */
  description: string;
  moved: number;
  segment?: Segment;
  color?: string;
  id?: string;
}

type Segmented = Array<Array<Technology[]>>;

interface ListChildComponentPropsWithData<T> {
  index: number;
  style: CSSProperties;
  data: T;
  isScrolling?: boolean;
}
