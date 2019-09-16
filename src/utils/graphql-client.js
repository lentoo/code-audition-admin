// import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { Message } from 'element-ui'
import { LocalStorage } from '.'
import router from '../router'
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(context => {
    return {
      ...context,
      headers: {
        ...context.header,
        authorization: LocalStorage.getItem('token') || null
      }
    }
  })

  return forward(operation)
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      switch (message) {
        case 'Access denied! You need to be authorized to perform this action!':
          // Message.error('没有权限操作')
          router.replace('/login')
          break
        default:
          Message.error(message)
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
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
const httpLink = createHttpLink({
  uri: GraphQLUrl
})
// Create the apollo client
const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache()
  // connectToDevTools: true
})
export default apolloClient
