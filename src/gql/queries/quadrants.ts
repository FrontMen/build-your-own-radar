import gql from 'graphql-tag';

export const QUADRANTS_QUERY = gql`
  query Quadrants {
    quadrants {
      id
      name
      color
      order
    }
  }
`;
