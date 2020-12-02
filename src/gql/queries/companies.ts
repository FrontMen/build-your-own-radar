import gql from 'graphql-tag';

export const COMPANIES_QUERY = gql`
  query Companies {
    companies {
      id
      name
      shortName
    }
  }
`;
