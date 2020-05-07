import gql from 'graphql-tag';

export const TECHNOLOGIES_QUERY = gql`
  query Technologies {
    technologies {
      id
      name
      description
      isNew
      companies {
        name
      }
      inRadar
      published_at
      quadrant {
        name
        color
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
      published_at
      quadrant {
        name
        color
      }
    }
  }
`;
