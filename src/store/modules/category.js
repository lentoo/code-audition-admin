import types from '../../constant/types/category-types'
import { getCategoryList } from '../../api/category'

const state = {
  [types.GET_CATEGORIES]: {}
}
const actions = {
  [types.GET_CATEGORIES]: async ({ commit }, params) => {
    const result = await getCategoryList(params)
    return commit([types.GET_CATEGORIES, result])
  }
}
const mutations = {
  [types.GET_CATEGORIES]: (state, res) => {
    state[types.GET_CATEGORIES] = res
  }
}
const getters = {
  getCategoriesList (state) {
    return state[types.GET_CATEGORIES]
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
