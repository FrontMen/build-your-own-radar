import {
  parseGoogleSheetsApiResponse,
  mapDatabaseEntries,
} from 'utils/dataParser';
import { convertTechToBlips } from 'redux/sagas/d3';

export const MockGoogleSheetsData: IncomingGoogleSheetsData = {
  sheets: [
    {
      properties: {
        title: 'data: 2020-01',
      },
      data: [
        {
          rowData: [
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'name',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'quadrant',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'ring',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'isNew',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'description',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'ITR BE',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'ITR NL',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'FM',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'In radar?',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: '.NET Core',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Frameworks, CMS & Programmeertalen',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Adopt',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'N',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'A-Frame',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Frameworks, CMS & Programmeertalen',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Assess',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {
                  effectiveValue: {
                    stringValue:
                      'A web framework for building virtual reality experiences',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: '?',
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Y',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'Alpine',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Platforms, infrastructure & Data',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Adopt',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {},
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'Y',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'AMQP',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Technieken',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Trial',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {
                  effectiveValue: {
                    stringValue:
                      'Advanced Messaging Queueing Protocol (Apache Kafka, RabbitMQ, AWS SQS)',
                  },
                },
                {},
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Y',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'Angular 2+',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Frameworks, CMS & Programmeertalen',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Assess',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Y',
                  },
                },
              ],
            },
            {
              values: [
                {
                  effectiveValue: {
                    stringValue: 'AngularJS (Angular 1)',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Frameworks, CMS & Programmeertalen',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Hold',
                  },
                },
                {
                  effectiveValue: {
                    boolValue: true,
                  },
                },
                {},
                {},
                {},
                {
                  effectiveValue: {
                    stringValue: 'X',
                  },
                },
                {
                  effectiveValue: {
                    stringValue: 'Y',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MockTechData: Technology[] = [
  {
    id: '1',
    name: 'A-Frame',
    description: 'A web framework for building virtual reality experiences',
    isNew: false,
    companies: [{ name: 'Frontmen', shortName: 'FM' }],
    inRadar: true,
    moved: 2,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Frameworks, CMS & Programmeertalen',
      color: '#31bd70',
      order: 0,
      localName: 'framwork',
    },
    ring: {
      name: 'Assess',
      order: 2,
      backgroundColor: '#D7D8D6',
    },
  },
  {
    id: '2',
    name: 'Alpine',
    description: '',
    isNew: true,
    moved: 0,
    companies: [{ shortName: 'ITR_NL', name: 'Intracto Netherlands' }],
    inRadar: true,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Platforms, infrastructure & Data',
      color: '#fd7e14',
      order: 2,
    },
    ring: {
      name: 'Adopt',
      order: 0,
      backgroundColor: '#BFC0BF',
    },
  },
  {
    id: '3',
    name: 'React-hooks',
    description: '',
    isNew: true,
    moved: 0,
    companies: [{ shortName: 'ITR_NL', name: 'Intracto Netherlands' }],
    inRadar: true,
    publishedAt: '2020-01-01',
    quadrant: {
      name: 'Techniques',
      color: '#fd7e14',
      order: 3,
    },
    ring: {
      name: 'Adopt',
      order: 0,
      backgroundColor: '#BFC0BF',
    },
  },
];

export const mockQuadrants = [
  { name: 'Frameworks, CMS & Programmeertalen', order: 0 },
  { name: 'Tooling en testing', order: 1 },
  { name: 'Platforms, infrastructure & Data', order: 2 },
  { name: 'Technieken', order: 3 },
];

export const parsedMockData = parseGoogleSheetsApiResponse(
  MockGoogleSheetsData,
);

export const parsedTechData = mapDatabaseEntries(MockTechData);
export const parsedMockDataItem = Object.values(parsedMockData)[0];
export const parsedTechDataItem = Object.values(parsedTechData)[0];
export const blips = convertTechToBlips(Object.values(parsedTechData)[0]);
