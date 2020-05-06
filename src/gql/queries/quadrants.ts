import gql from 'graphql-tag';

const QUADRANTS_QUERY = gql`
  query Quadrants {
    quadrants {
      id
      name
      color
    }
  }
`;

export default QUADRANTS_QUERY;
