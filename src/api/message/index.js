import qs from 'qs'
import axios from '../index'
/**
 * @description 题目列表
 */
export const feedbackList = params => axios.get(`/audition/feedback/back?${qs.stringify(params)}`)
/**
 * @description 题目审核
 * @param {*} params
 */
export const feedbackAudit = params => axios.put(`/audition/feedback/back/${params.id}?${qs.stringify(params)}`)
