
export default [
  {
    path: '/:entity',
    component: () => import('pages/DynamicCrudPage.vue')
  }
]
