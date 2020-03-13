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
type CompanyTypes = 'ITR_BE' | 'ITR_NL' | 'FM';

interface Technology extends Partial<Point> {
  name: string;
  ring: RingNamesType;
  quadrant: num;
  isNew: boolean;
  description: string;
  companies: CompanyTypes[];
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

type QuadParamType = {
  readonly quadrant: string;
};
