import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from "apollo-boost"

const uri = "https://rickandmortyapi.com/graphql/"
const link = new HttpLink({ uri })
const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link
});