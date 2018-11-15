import Layout from '../views/layout/Layout'

export default {
  path: '/validator',
  component: Layout,
  redirect: '/validator/list',
  name: 'Validator',
  meta: { title: 'Validator', icon: 'blocks' },
  children: [
    {
      path: 'list',
      name: 'ValidatorList',
      hidden: true,
      component: () => import('@/views/validator/list/index'),
      meta: { title: 'List', icon: 'validators' },
      children: [
        {
          path: 'detail/:address?',
          name: 'ValidatorDetail',
          hidden: true,
          component: () => import('@/views/validator/detail/index'),
          meta: { title: 'Detail', icon: 'nested' }
        }
      ]
    }
  ]
}
