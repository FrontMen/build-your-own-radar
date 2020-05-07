import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const typeDefs = `
  type Query {
    technologies: [Technology]
  }

  type Technology {
    name: String!
    description: String
    isNew: Boolean
    published_at: Date
    inRadar: Boolean
    quadrant: Quadrant
    ring: Ring
    companies: [Company]
  }

  type Ring {
    name: String!
    color: String!
    backgroundColor: String!
    order: Int
  }

  type Quadrant {
    name: String!
    color: String!
  }

  type Company {
    name: String!
    shortName: String!
  }

`;
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

export const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link,
  typeDefs,
});
