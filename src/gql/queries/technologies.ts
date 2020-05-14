import gql from 'graphql-tag';

export const TECHNOLOGIES_QUERY = gql`
  query Technologies {
    technologies {
      id
      name
      description
      isNew
      companies {
        shortName
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
      publishedAt
      quadrant {
        name
        color
        order
      }
    }
  }
`;
