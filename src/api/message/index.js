import { fetchFeedback, auditFeedback } from './index.graphql'
import client from '../../utils/graphql-client'

export const fetchFeedbackList = params =>
  client
    .query({
      query: fetchFeedback,
      variables: params,
      fetchPolicy: 'network-only'
    })
    .then(({ data }) => data.fetchFeedback)

export const auditFeedbackItem = params =>
  client
    .mutate({
      mutation: auditFeedback,
      variables: params
    })
    .then(({ data }) => data.auditFeedback)
