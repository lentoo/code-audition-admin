import client from '../../utils/graphql-client'
import {
  addQuestion,
  updateQuestion,
  removeQuestion,
  questions,
  question,
  reviewQuestion
} from './index.graphql'
export const fetchQuestionList = (params, noCache = false) => {
  const query = {
    query: questions,
    variables: params,
    // eslint-disable-next-line no-constant-condition
    fetchPolicy: true ? 'network-only' : null
  }
  return client.query(query).then(({ data }) => data.fetchQuestionList)
}

export const addQuestionItem = params =>
  client
    .mutate({
      mutation: addQuestion,
      variables: params
    })
    .then(({ data }) => data.addQuestion)

export const updateQuestionItem = params =>
  client
    .mutate({
      mutation: updateQuestion,
      variables: params
    })
    .then(({ data }) => data.updateQuestion)

export const removeQuestionItem = params =>
  client
    .mutate({
      mutation: removeQuestion,
      variables: params
    })
    .then(({ data }) => data.removeQuestion)

export const fetchQuestionItem = params =>
  client
    .query({ query: question, variables: params, fetchPolicy: 'network-only' })
    .then(({ data }) => data.fetchQuestion)

export const reviewQuestionItem = params =>
  client
    .mutate({ mutation: reviewQuestion, variables: params })
    .then(({ data }) => data.reviewQuestion)
