export default [
  {
    path: '/message/feedback',
    component: () => import(/* webpackChunkName: "message-feedback" */ '@/views/message-manager/feedback.vue')
  }
]
