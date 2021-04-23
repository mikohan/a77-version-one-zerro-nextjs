import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { backServerUrl } from '~/config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors?.map(({ message, path }) => {
      console.log(`Graphql Error: ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: `${backServerUrl}/product/graphql` }),
]);
const linkBlog = from([
  errorLink,
  new HttpLink({ uri: `${backServerUrl}/companypages/graphql` }),
]);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
export const clientBlog = new ApolloClient({
  link: linkBlog,
  cache: new InMemoryCache(),
});
