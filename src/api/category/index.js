import client from '../../utils/graphql-client'
import { fetchSort, saveSort, removeSort } from './index.graphql'

export const fetchSorts = params =>
  client
    .query({
      query: fetchSort,
      variables: params,
      fetchPolicy: 'network-only'
    })
    .then(({ data }) => data.sorts)

export const saveSorts = params =>
  client
    .mutate({
      mutation: saveSort,
      variables: params
    })
    .then(({ data }) => data.saveSort)

export const removeSortItem = params =>
  client
    .mutate({
      mutation: removeSort,
      variables: params
    })
    .then(({ data }) => data.removeSort)
