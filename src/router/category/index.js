export default [
  {
    path: '/category/index',
    component: () => import(/* webpackChunkName: "category-index" */ '@/views/category/index.vue')
  }
]
