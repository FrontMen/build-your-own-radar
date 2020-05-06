import gql from 'graphql-tag';

const TECHNOLOGY_QUERY = gql`
  query Technologies($wh: JSON) {
    technologies(where: $wh) {
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

export default TECHNOLOGY_QUERY;
