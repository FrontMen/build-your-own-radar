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

type RingNamesType = 'Adopt' | 'Trail' | 'Assess' | 'Hold';

interface Technology extends Partial<Point> {
  name: string;
  ring: RingNamesType;
  quadrant: string;
  isNew: boolean;
  description: string;
  ITR_BE: boolean;
  ITR_NL: boolean;
  FM: boolean;
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
