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

interface Technology {
  quadrant: number;
  ring: number;
  label: string;
  active: boolean;
  link: string;
  moved: number;
  segment?: Segment;
  x?: number;
  y?: number;
  color?: string;
  id?: string;
}

type Segmented = Array<Array<Technology[]>>
