import React, { createContext, useState, useEffect } from 'react';
import { ParseGoogleSheetsApiResponse } from 'src/utils/dataParser';

const SPREADSHEET = '1V2DJEiF7vmx-zhh4_kyUmDsUVF7zt40SSkkKDRoJXug';
const API_KEY = 'AIzaSyCrUdcfg1a4hKCucwQuP4hCS8WSVL1SSuY';
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

type GoogleSheetsState = {
  data: [] | Technology[];
};

const initialState: GoogleSheetsState = { data: [] };

export const GoogleSheetsContext = createContext<GoogleSheetsState>(
  initialState,
);

export const GoogleSheetsContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<GoogleSheetsState>(initialState);

  useEffect(() => {
    fetch(requestURL(SPREADSHEET, API_KEY))
      .then(res => res.json())
      .then(data => {
        // TODO add support for consuming multiple sheets.
        const firstSheet = ParseGoogleSheetsApiResponse(data)['data: 2020-01']!;
        setState({ data: firstSheet });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <GoogleSheetsContext.Provider value={state}>
      {children}
    </GoogleSheetsContext.Provider>
  );
};
