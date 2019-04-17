import qs from 'qs'
import axios from '../index'

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
