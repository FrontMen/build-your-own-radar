import { d3Config } from 'utils/d3-config';

const ARRAY_LENGTH = 4;
const ringsOrder = Object.keys(d3Config.rings).reduce(
  (acc: any, ring: string, index: number) => {
    acc[ring] = index;
    return acc;
  },
  {},
);

const initNewCounter = () => {
  return [...Array(ARRAY_LENGTH)].map(() => {
    return [...Array(ARRAY_LENGTH)].map(() => 0);
  });
};

export const parseGoogleSheetsApiResponse = (
  sheets: IncomingGoogleSheetsData,
): ParsedGoogleSheets => {
  return sheets.sheets.reduce((acc: ParsedGoogleSheets, sheet, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, title] = sheet.properties.title.split(':');
    if (!isNaN(Date.parse(title))) {
      const { cumulativeCounter, flatData } = flattenSheet(
        sheet.data[0].rowData,
        index,
      );
      acc[title.trim()] = addIndex(flatData, cumulativeCounter);
    }

    return acc;
  }, {});
};

const addIndex = (data: Technology[], cumulativeCounter: any) => {
  const newCounter = initNewCounter();

  data.forEach(item => {
    const { ring, quadrant } = item;
    const ringOrder = ringsOrder[ring];
    const startFrom = cumulativeCounter[quadrant.order][ringOrder];
    const currentIndex = ++newCounter[quadrant.order][ringOrder];

    item.id = `${startFrom + currentIndex}`;
  });

  return data;
};

const flattenSheet = (
  data: [KeyRowValues, ...RowValues[]],
  sheetIndex: number,
) => {
  let i;
  const [keyRow, ...remainingDataRows] = data;
  const keys = getSheetTableHeaders(keyRow);
  const counter = initNewCounter();
  const flatData = (remainingDataRows as RowValues[])
    .map((row, index) => {
      let flatRow = flattenDataRows(row, keys, index);
      if (flatRow) {
        flatRow.positionId = `${sheetIndex}-${index}`;
        const ringOrder = ringsOrder[flatRow.ring];
        for (i = ringOrder + 1; i < ARRAY_LENGTH; i++) {
          // Cumulate the count
          counter[flatRow.quadrant.order][i]++;
        }
      }

      return flatRow;
    })
    .filter(Boolean) as Technology[];

  return {
    cumulativeCounter: counter,
    flatData,
  };
};

function getSheetTableHeaders(row: KeyRowValues) {
  // TODO: This should probably throw an error if the cell doesn't contain a string, Not sure how to Type that.
  return row.values.map(({ effectiveValue }) => {
    if (!effectiveValue) {
      throw new Error(
        'Sheet table headers should have names, please fix data source',
      );
    }
    return effectiveValue.stringValue!;
  });
}

function flattenDataRows(
  row: RowValues,
  keys: MappedDataRowKey[],
  index: number,
) {
  let newRow = row.values.reduce((acc, { effectiveValue }, i) => {
    let value = effectiveValue
      ? effectiveValue.stringValue
        ? effectiveValue.stringValue
        : effectiveValue.boolValue
      : '';
    (acc[keys[i]] as typeof value) = value;
    return acc;
  }, {} as MappedDataRow);

  return cleanRow(newRow, index);
}

const cleanRow = (
  { quadrant, 'ITR BE': ITR_BE, 'ITR NL': ITR_NL, FM, ...item }: MappedDataRow,
  index: number,
): Technology | undefined => {
  if (item['In radar?'] === 'N') return;
  //@ts-ignore
  return {
    ...item,
    id: `${index}`,
    moved: 0,
    quadrant: { name: 'test', color: 'test', order: 0 },
    companies: [{ name: 'test', shortName: 'test' }].filter(
      Boolean,
    ) as Company[],
  };
};
