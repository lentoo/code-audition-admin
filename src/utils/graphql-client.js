// import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { Message } from 'element-ui'
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null
    }
  })

  return forward(operation)
})
const otherMiddleware = new ApolloLink((operation, forward) => {
  // add the recent-activity custom header to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'recent-activity': localStorage.getItem('lastOnlineTime') || null
    }
  }))

  return forward(operation).map(result => {
    console.log('result', result)
    return result
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      Message.error(message)
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    Message.error('好像与网络世界断开了联系，请检查一下网络')
  }
})
const GraphQLUrl =
  process.env.NODE_ENV === 'development'
    ? '//localhost:7001/graphql'
    : '//test-xcx.ccode.live/graphql'
const httpLink = new HttpLink({
  uri: GraphQLUrl
})
// Create the apollo client
const apolloClient = new ApolloClient({
  // link: from([middleware, httpLink]),
  link: from([authMiddleware, otherMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})
export default apolloClient
