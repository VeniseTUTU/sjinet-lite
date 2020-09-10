import { ApolloClient, } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import {persistCache} from 'apollo-cache-persist';
import store from 'storejs';
const grapgQlEndpoint = process.env.NODE_ENV === 'development' 
				 ? process.env.GRAPHQL_ENDPOINT_DEV
				 : process.env.GRAPHQL_ENDPOINT


const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
});

const httpLink = createHttpLink({
  uri: grapgQlEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const userId = store.has('user') ? store.get('user').userid : '';
  const token = store.has('Token') ? store.get('Token').token : '';
  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      userid: userId
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {}
});

const data = {
  user: [],
  transaction:[],
  history: [],
  queue: [],
  likes: [],
  videoFilter:'',
  plan:'',
  route:'',
}

const setInitialCache = () => cache.writeData({ data });
setInitialCache();

client.onClearStore(() => setInitialCache());
