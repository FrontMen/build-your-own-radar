import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
});

export const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link,
});
