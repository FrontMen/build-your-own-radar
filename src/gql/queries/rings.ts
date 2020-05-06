import gql from 'graphql-tag';

const RINGS_QUERY = gql`
  query Rings {
    rings {
      name
      color
      backgroundColor
      order
    }
  }
`;

export default RINGS_QUERY;
