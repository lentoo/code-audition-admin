import qs from 'qs'
import axios from '../index'
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
/**
 * @description 分类列表查看
 * @author lentoo
 * @date 2019-04-16
 * @export
 * @param {*} params
 * @returns
 */
export function getCategoryList (params) {
  return axios.get('/audition/sort/back/list?' + qs.stringify(params))
}

/**
 * @description 添加分类
 * @author lentoo
 * @date 2019-04-16
 * @export
 * @param {*} params
 * @returns
 */
export function addCategory (params) {
  return axios.post('/audition/sort/back/post', qs.stringify(params))
}

/**
 * @description 修改分类
 * @author lentoo
 * @date 2019-04-16
 * @export
 * @param {*} params
 * @returns
 */
export function updateCategory (params) {
  return axios.put(`/audition/sort/back/put/${params.id}`, qs.stringify(params))
}

/**
 * @description 删除分类
 * @author lentoo
 * @date 2019-04-16
 * @export
 * @param {*} params
 * @returns
 */
export function deleteCategory (id) {
  return axios.delete(`/audition/sort/back/${id}`)
}
