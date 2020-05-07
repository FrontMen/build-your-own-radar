import gql from 'graphql-tag';

export const TECHNOLOGY_ONE_QUERY = gql`
  query OneTechnology($id: ID!) {
    technology(id: $id) {
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
