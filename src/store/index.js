import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from '../utils'
Vue.use(Vuex)
const requireContext = require.context('./modules', true, /\w+(.js)$/)
let allModules = {}
requireContext.keys().map(file => {
  const obj = requireContext(file).default
  const reg = /\.\/(\w+).js/
  const result = reg.exec(file)
  if (result) {
    allModules[result[1]] = obj
  }
})
export const types = {
  MENU_COLLAPSE: 'MENU_COLLAPSE',
  BREADCRUMB_ITEMS: 'BREADCRUMB_ITEMS',
  UPDATE_USER: 'UPDATE_USER'
}
const u = LocalStorage.getItem('u')
export default new Vuex.Store({
  state: {
    [types.MENU_COLLAPSE]: false,
    [types.BREADCRUMB_ITEMS]: [],
    user: u || {}
  },
  mutations: {
    [types.MENU_COLLAPSE]: (state, res) => {
      state[types.MENU_COLLAPSE] = res
    },
    [types.BREADCRUMB_ITEMS]: (state, res) => {
      state[types.BREADCRUMB_ITEMS] = res
    },
    [types.UPDATE_USER]: (state, res) => {
      state.user = res
    }
  },
  actions: {
    [types.MENU_COLLAPSE]: async ({ commit }, state) => {
      return commit(types.MENU_COLLAPSE, state)
    },
    [types.BREADCRUMB_ITEMS]: async ({ commit }, state) => {
      return commit(types.BREADCRUMB_ITEMS, state)
    },
    [types.UPDATE_USER]: async ({ commit }, user) => {
      return commit(types.UPDATE_USER, user)
    }
  },
  getters: {
    getMenuCollapse (state) {
      return state[types.MENU_COLLAPSE]
    },
    getBreadcrumbItems (state) {
      return state[types.BREADCRUMB_ITEMS]
    },
    getUser (state) {
      return state.user
    }
  },
  modules: {
    ...allModules
  }
})
