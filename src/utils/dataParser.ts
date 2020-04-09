import { d3Config } from 'utils/d3-config';

export function parseGoogleSheetsApiResponse(
  sheets: IncomingGoogleSheetsData,
): ParsedGoogleSheets {
  return sheets.sheets.reduce((acc: ParsedGoogleSheets, sheet, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, title] = sheet.properties.title.split(':');
    if (!isNaN(Date.parse(title))) {
      acc[title.trim()] = flattenSheet(sheet.data[0].rowData, index);
    }

    return acc;
  }, {});
}

function flattenSheet(
  data: [KeyRowValues, ...RowValues[]],
  sheetIndex: number,
) {
  const [keyRow, ...remainingDataRows] = data;
  const keys = getSheetTableHeaders(keyRow);

  return (remainingDataRows as RowValues[]).reduce((acc, row, index) => {
    const tempRow = flattenDataRows(row, keys, index);
    if (tempRow) {
      tempRow.positionId = `${sheetIndex}-${index}`;
      acc.push(tempRow);
    }
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

export const cleanRow = (
  { quadrant, 'ITR BE': ITR_BE, 'ITR NL': ITR_NL, FM, ...item }: MappedDataRow,
  index: number,
): Technology | undefined => {
  if (item['In radar?'] === 'N') return;
  return {
    ...item,
    id: `${index}`,
    moved: 0,
    quadrant: d3Config.quadrants.findIndex(quad => quad.name === quadrant),
    companies: [
      ITR_BE === 'X' ? 'ITR_BE' : false,
      ITR_NL === 'X' ? 'ITR_NL' : false,
      FM === 'X' ? 'FM' : false,
    ].filter(Boolean) as CompanyTypes[],
  };
};
