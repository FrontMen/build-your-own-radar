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
  quadrant: number;
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
