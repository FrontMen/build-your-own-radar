import { d3Config } from 'src/utils/d3-config';

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
  effectiveValue: { stringValue: MappedDataRowKey };
};
type EffectiveValue = {
  effectiveValue: { stringValue?: string; boolValue?: boolean };
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

export function ParseGoogleSheetsApiResponse(
  sheets: IncomingGoogleSheetsData,
): ParsedGoogleSheets {
  return sheets.sheets.reduce((acc: ParsedGoogleSheets, sheet) => {
    let tempSheet = flattenSheet(sheet);
    if (tempSheet) {
      acc[sheet.properties.title] = tempSheet;
    }
    return acc;
  }, {});
}

function flattenSheet(sheet: IncomingSheet) {
  const dataRows = sheet.data[0].rowData;
  const keys = getSheetTableHeaders(dataRows.shift()! as KeyRowValues);

  const [nameSpace, title] = sheet.properties.title.split(':');
  if (nameSpace === 'data') {
    const [year, monthIndex] = title.split('-');
    const date = new Date(parseInt(year), parseInt(monthIndex));
    if (date) {
      return (dataRows as RowValues[]).map(row => flattenDataRows(row, keys));
    } else {
      // TODO: do something with other sheets like the config sheet.
    }
  }
}

function getSheetTableHeaders(row: KeyRowValues) {
  // TODO: This should probably throw an error if the cell doesn't contain a string, Not sure how to Type that.
  return row.values.map(({ effectiveValue }) => {
    return effectiveValue.stringValue!;
  });
}

function flattenDataRows(row: RowValues, keys: MappedDataRowKey[]) {
  let newRow = row.values.reduce((acc, { effectiveValue }, i) => {
    let value = effectiveValue
      ? effectiveValue.stringValue
        ? effectiveValue.stringValue
        : effectiveValue.boolValue
      : '';
    (acc[keys[i]] as typeof value) = value;
    //
    return acc;
  }, {} as MappedDataRow);

  // return newRow;
  return cleanRow(newRow);
}

export const cleanRow = ({
  quadrant,
  'ITR BE': ITR_BE,
  'ITR NL': ITR_NL,
  FM,
  ...item
}: MappedDataRow): Technology => {
  return {
    ...item,
    moved: 0,
    quadrant: d3Config.quadrants.findIndex(quad => quad.name === quadrant),
    companies: [
      ITR_BE === 'X' ? 'ITR_BE' : false,
      ITR_NL === 'X' ? 'ITR_NL' : false,
      FM === 'X' ? 'FM' : false,
    ].filter(Boolean) as CompanyTypes[],
  };
};
