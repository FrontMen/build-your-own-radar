import React, { createContext, useState, useEffect } from 'react';
import { parseGoogleSheetsApiResponse } from 'src/utils/dataParser';
import { getGoogleSheetsData } from 'src/utils/API';

const SPREADSHEET = '1V2DJEiF7vmx-zhh4_kyUmDsUVF7zt40SSkkKDRoJXug';
const API_KEY = 'AIzaSyCrUdcfg1a4hKCucwQuP4hCS8WSVL1SSuY';

type GoogleSheetsState = {
  data: Technology[];
};

const initialState: GoogleSheetsState = { data: [] };

export const googleSheetsContext = createContext<GoogleSheetsState>(
  initialState,
);

export const GoogleSheetsContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<GoogleSheetsState>(initialState);

  const { Provider } = googleSheetsContext;

  useEffect(() => {
    getGoogleSheetsData(SPREADSHEET, API_KEY)
      .then(data => {
        // TODO add support for consuming multiple sheets.
        return parseGoogleSheetsApiResponse(data)['data: 2020-01'];
      })
      .then(parsedData => {
        setState({ data: parsedData });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return <Provider value={state}>{children}</Provider>;
};
