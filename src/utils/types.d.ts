interface Polar {
  t: number;
  r: number;
}

interface Point {
  x: number;
  y: number;
}

interface Blip
  extends Pick<
      Technology,
      'positionId' | 'ring' | 'name' | 'isNew' | 'quadrant' | 'id'
    >,
    Point {
  vx: number;
  vy: number;
  segment: Segment;
  color: string;
  animate: 'translate' | 'bounce' | null;
}

interface Segment {
  clipx: (d: Point) => number;
  clipy: (d: Point) => number;
  random: () => Point;
}

type RingNamesType = 'Adopt' | 'Trial' | 'Assess' | 'Hold';
type CompanyTypes = 'ITR_BE' | 'ITR_NL' | 'FM';

interface Technology extends Partial<Point> {
  name: string;
  ring: RingNamesType;
  quadrant: number;
  isNew: boolean;
  companies: CompanyTypes[];
  description: string;
  moved: number;
  segment?: Segment;
  color?: string;
  id?: string;
  positionId?: string;
}

type QuadParamType = {
  readonly quadrant: string;
};

type IncomingGoogleSheetsData = {
  sheets: IncomingSheet[];
};

type IncomingSheet = {
  properties: {
    title: string;
  };
  data: [
    {
      rowData: [KeyRowValues, ...RowValues[]];
    },
  ];
};

type RowValues = { values: EffectiveValue[] };
type KeyRowValues = { values: KeyEffectiveValue[] };

type KeyEffectiveValue = {
  effectiveValue?: { stringValue: MappedDataRowKey };
};
type EffectiveValue = {
  effectiveValue?: { stringValue?: string; boolValue?: boolean };
};

interface MappedDataRow {
  name: string;
  quadrant: string;
  ring: RingNamesType;
  isNew: boolean;
  description: string;
  'ITR BE': string;
  'ITR NL': string;
  FM: string;
  'In radar?'?: 'Y' | 'N';
}

type MappedDataRowKey = keyof MappedDataRow;

interface ParsedGoogleSheets {
  [K: string]: Technology[];
}
