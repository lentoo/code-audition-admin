import * as types from '../../constant/types/message-types'
import { feedbackList, feedbackAudit } from '../../api/message'

const state = {
  [types.GET_FEEDBACK]: {},
  [types.AUDIT_FEEDBACK]: {}
}
const actions = {
  [types.GET_FEEDBACK]: async ({ commit }, params) => {
    const result = await feedbackList(params)
    return commit(types.GET_FEEDBACK, result)
  },
  [types.AUDIT_FEEDBACK]: async ({ commit }, params) => {
    const result = await feedbackAudit(params)
    return commit(types.AUDIT_FEEDBACK, result)
  }
}
const mutations = {
  [types.GET_FEEDBACK]: (state, res) => {
    state[types.GET_FEEDBACK] = res
  },
  [types.AUDIT_FEEDBACK]: (state, res) => {
    state[types.AUDIT_FEEDBACK] = res
  }
}
const getters = {
  getFeedbackList (state) {
    return state[types.GET_FEEDBACK]
  },
  getAuditFeedback (state) {
    return state[types.AUDIT_FEEDBACK]
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
