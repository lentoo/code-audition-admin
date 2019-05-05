export default [
  {
    path: '/question/review',
    component: () => import(/* webpackChunkName: "question-review" */ '@/views/question/review.vue')
  },
  {
    path: '/question/review/add',
    component: () => import(/* webpackChunkName: "question-add" */ '@/views/question/add-question.vue')
  }
]
