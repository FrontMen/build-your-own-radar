import { d3Config } from 'src/utils/d3-config';

export function parseGoogleSheetsApiResponse(
  sheets: IncomingGoogleSheetsData,
): ParsedGoogleSheets {
  return sheets.sheets.reduce((acc: ParsedGoogleSheets, sheet) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, title] = sheet.properties.title.split(':');
    if (!isNaN(Date.parse(sheet.properties.title))) {
      acc[title] = flattenSheet(sheet.data[0].rowData);
    }

    return acc;
  }, {});
}

function flattenSheet(data: [KeyRowValues, ...RowValues[]]) {
  const [keyRow, ...remainingDataRows] = data;
  const keys = getSheetTableHeaders(keyRow);

  return (remainingDataRows as RowValues[]).reduce((acc, row) => {
    const tempRow = flattenDataRows(row, keys);
    if (tempRow) acc.push(tempRow);
    return acc;
  }, [] as Technology[]);
}

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

function flattenDataRows(row: RowValues, keys: MappedDataRowKey[]) {
  let newRow = row.values.reduce((acc, { effectiveValue }, i) => {
    let value = effectiveValue
      ? effectiveValue.stringValue
        ? effectiveValue.stringValue
        : effectiveValue.boolValue
      : '';
    (acc[keys[i]] as typeof value) = value;
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
}: MappedDataRow): Technology | undefined => {
  if (item['In radar?'] === 'N') return;
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
