export default [
  {
    path: '/message/feedback',
    component: () =>
      import(/* webpackChunkName: "message-feedback" */ '@/views/message-manager/Feedback/index.vue')
  }
]
