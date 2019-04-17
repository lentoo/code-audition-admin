import types from '../../constant/types/category-types'
import { getCategoryList, addCategory, updateCategory, deleteCategory } from '../../api/category'

const state = {
  [types.GET_CATEGORIES]: {},
  [types.ADD_CATEGORY]: {},
  [types.UPDATE_CATEGORY]: { },
  [types.DELETE_CATEGORY]: { }
}
const actions = {
  [types.GET_CATEGORIES]: async ({ commit }, params) => {
    const result = await getCategoryList(params)
    return commit(types.GET_CATEGORIES, result)
  },
  [types.ADD_CATEGORY]: async ({ commit }, params) => {
    const result = await addCategory(params)
    return commit(types.ADD_CATEGORY, result)
  },
  [types.UPDATE_CATEGORY]: async ({ commit }, params) => {
    const result = await updateCategory(params)
    return commit(types.UPDATE_CATEGORY, result)
  },
  [types.DELETE_CATEGORY]: async ({ commit }, params) => {
    const result = await deleteCategory(params)
    return commit(types.DELETE_CATEGORY, result)
  }
}
const mutations = {
  [types.GET_CATEGORIES]: (state, res) => {
    state[types.GET_CATEGORIES] = res
  },
  [types.ADD_CATEGORY]: (state, res) => {
    state[types.ADD_CATEGORY] = res
  },
  [types.UPDATE_CATEGORY]: (state, res) => {
    state[types.UPDATE_CATEGORY] = res
  },
  [types.DELETE_CATEGORY]: (state, res) => {
    state[types.DELETE_CATEGORY] = res
  }
}
const getters = {
  getCategoriesList (state) {
    return state[types.GET_CATEGORIES]
  },
  getAddCategory (state) {
    return state[types.ADD_CATEGORY]
  },
  getUpdateCategory (state) {
    return state[types.UPDATE_CATEGORY]
  },
  getDeleteCategory (state) {
    return state[types.DELETE_CATEGORY]
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
