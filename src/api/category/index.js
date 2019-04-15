import qs from 'qs'
import axios from '../index'

export function getCategoryList (params) {
  return axios.get('/audition/sort?' + qs.stringify(params))
}
