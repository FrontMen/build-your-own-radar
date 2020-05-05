import gql from 'graphql-tag';

const TECHNOLOGIES_QUERY = gql`
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

export default TECHNOLOGIES_QUERY;
