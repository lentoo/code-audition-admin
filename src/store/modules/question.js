import * as types from '../../constant/types/question-types'
import { questionList, questionAudit, questionDetail } from '../../api/question'

const state = {
  [types.GET_QUESTION_LIST]: {},
  [types.AUDIT_QUESTION]: {},
  [types.QUESTION_DETAIL]: {}
}
const actions = {
  [types.GET_QUESTION_LIST]: async ({ commit }, params) => {
    const result = await questionList(params)
    return commit(types.GET_QUESTION_LIST, result)
  },
  [types.AUDIT_QUESTION]: async ({ commit }, params) => {
    const result = await questionAudit(params)
    return commit(types.AUDIT_QUESTION, result)
  },
  [types.QUESTION_DETAIL]: async ({ commit }, params) => {
    const result = await questionDetail(params)
    return commit(types.QUESTION_DETAIL, result)
  }
}
const mutations = {
  [types.GET_QUESTION_LIST]: (state, res) => {
    state[types.GET_QUESTION_LIST] = res
  },
  [types.AUDIT_QUESTION]: (state, res) => {
    state[types.AUDIT_QUESTION] = res
  },
  [types.QUESTION_DETAIL]: (state, res) => {
    state[types.QUESTION_DETAIL] = res
  }
}
const getters = {
  getQuestionList (state) {
    return state[types.GET_QUESTION_LIST]
  },
  getAuditQuestion (state) {
    return state[types.AUDIT_QUESTION]
  },
  getQuestionDetail (state) {
    return state[types.QUESTION_DETAIL]
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
