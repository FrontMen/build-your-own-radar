import { parseGoogleSheetsApiResponse } from 'src/utils/dataParser';

export const mockData: Technology[] = [
  {
    name: 'Babel',
    ring: 'Adopt',
    quadrant: 3,
    isNew: true,
    description:
      'This is the description. You can use basic html such as the <strong>strong tag to emphasise keywords and phrases</strong> and insert',
    moved: 0,
    companies: ['ITR_BE', 'ITR_NL', 'FM'],
  },
  {
    name: 'Spark',
    ring: 'Adopt',
    quadrant: 3,
    isNew: true,
    description:
      'This is the description. You can use basic html such as the <strong>strong tag to emphasise keywords and phrases</strong> and insert',
    moved: 0,
    companies: ['ITR_BE', 'ITR_NL', 'FM'],
  },
  {
    name: 'Electron',
    ring: 'Assess',
    quadrant: 1,
    isNew: false,
    description:
      'This is the description. You can use basic html such as the <strong>strong tag to emphasise keywords and phrases</strong> and insert <a href="https://www.thoughtworks.com">anchor links to documentation and referance material</a>.',
    moved: 0,
    companies: ['ITR_NL', 'FM'],
  },
];

/*
{
  parsedData: [
    // {
    //   name: '.NET Core',
    //   ring: 'Adopt',
    //   isNew: true,
    //   description: '',
    //   'In radar?': 'N',
    //   moved: 0,
    //   quadrant: 0,
    //   companies: [Array]
    // },
    {
      name: 'A-Frame',
      ring: 'Assess',
      isNew: true,
      description: 'A web framework for building virtual reality experiences',
      'In radar?': 'Y',
      moved: 0,
      quadrant: 0,
      companies: [Array]
    },
    {
      name: 'Alpine',
      ring: 'Adopt',
      isNew: true,
      description: '',
      'In radar?': 'Y',
      moved: 0,
      quadrant: 2,
      companies: [Array]
    },
    {
      name: 'AMQP',
      ring: 'Trial',
      isNew: true,
      description: 'Advanced Messaging Queueing Protocol (Apache Kafka, RabbitMQ, AWS SQS)',
      'In radar?': 'Y',
      moved: 0,
      quadrant: 3,
      companies: [Array]
    },
    {
      name: 'Angular 2+',
      ring: 'Assess',
      isNew: true,
      description: '',
      'In radar?': 'Y',
      moved: 0,
      quadrant: 0,
      companies: [Array]
    },
    {
      name: 'AngularJS (Angular 1)',
      ring: 'Hold',
      isNew: true,
      description: '',
      'In radar?': 'Y',
      moved: 0,
      quadrant: 0,
      companies: [Array]
    }
  ]
}
*/

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

export const parsedMockData = parseGoogleSheetsApiResponse(MockGoogleSheetsData)['data: 2020-01'];
