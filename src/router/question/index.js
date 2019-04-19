export default [
  {
    path: '/question/review',
    component: () => import(/* webpackChunkName: "question-review" */ '@/views/question/review.vue')
  }
]
