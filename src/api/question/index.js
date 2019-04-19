import qs from 'qs'
import axios from '../index'
/**
 * @description 题目列表
 */
export const questionList = params => axios.get(`/audition/questionAudit/back?${qs.stringify(params)}`)

/**
 * @description 审核题目
 * @param {*} params
 */
export const questionAudit = params => axios.put(`/audition/questionAudit/back/audit/${params.id}`, qs.stringify(params))

/**
 * @description 题目详情
 * @param {*} params
 */
export const questionDetail = params => axios.get(`/audition/questionAudit/back/${params.id}`)
