import gql from 'graphql-tag';

export const RINGS_QUERY = gql`
  query Rings {
    rings {
      name
      color
      backgroundColor
      order
    }
  }
`;
