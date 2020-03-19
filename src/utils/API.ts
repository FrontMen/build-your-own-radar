/* 
  Opted to use the http API so as to not pull in any google scripts unnecessarily.
  To play with the google API go to:
  https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get?apix=true&cf_lbyyhhwhyjj5l3rs65cb3w=tn4ndag841q5atgdz5vdj&apix_params=%7B%22spreadsheetId%22%3A%221V2DJEiF7vmx-zhh4_kyUmDsUVF7zt40SSkkKDRoJXug%22%2C%22includeGridData%22%3Afalse%2C%22ranges%22%3A%5B%22A%3AI%22%5D%2C%22fields%22%3A%22sheets.properties.title%2Csheets.data.rowData.values.effectiveValue%22%7D

  - fields: We are filtering the data with some field filters
  - ranges: As well as limiting the range to cut off the columns that are used for other things
  - spreadsheet: the ID of the spreadsheet (from its url)
  - key: API key setup with google developer console https://console.developers.google.com/
*/

const requestURL = (spreadsheet: string, apiKey: string) =>
  `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet}?ranges=A%3AI&fields=sheets.properties.title%2Csheets.data.rowData.values.effectiveValue&key=${apiKey}`;

export const getGoogleSheetsData = (spreadsheet: string, apiKey: string) =>
  fetch(requestURL(spreadsheet, apiKey)).then(res => res.json());
