import gql from 'graphql-tag';

export const TECHNOLOGIES_QUERY = gql`
  query Technologies {
    timelines {
      id
      name
      description
      isNew
      devCount {
        name
      }
      companies {
        shortName
        name
      }
      inRadar
      publishedAt
      quadrant {
        name
        color
        order
      }
      ring {
        name
        order
        backgroundColor
      }
    }
  }
`;

export const TECHNOLOGIES_FILTER = gql`
  query Technologies($wh: JSON) {
    technologies(where: $wh) {
      id
      name
      description
      quadrant {
        name
        color
        order
      }
    }
  }
`;
