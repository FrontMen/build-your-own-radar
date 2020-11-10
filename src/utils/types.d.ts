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
      'positionId' | 'ring' | 'name' | 'isNewTopic' | 'quadrant' | 'id'
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
type Quadrant = {
  name: string;
  color: string;
  order: number;
  localName?: string;
};
type Company = {
  name: string;
  shortName: CompanyTypes;
};
type Ring = {
  name: RingNamesType;
  color?: string;
  backgroundColor: string;
  order: number;
};
interface Technology extends Partial<Point> {
  name: string;
  ring: Ring;
  quadrant: Quadrant;
  isNewTopic: boolean;
  companies: Company[];
  description: string;
  moved: number;
  segment?: Segment;
  color?: string;
  id?: string;
  positionId?: string;
  inRadar: boolean;
  publishedAt: date;
}

type QuadParamType = {
  readonly order: string;
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
  isNewTopic: boolean;
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
