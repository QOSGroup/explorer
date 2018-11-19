import Layout from '../views/layout/Layout'

export default {
  path: '/account',
  component: Layout,
  redirect: '/account/detail',
  name: 'Account',
  meta: { title: 'Account', icon: 'blocks' },
  children: [
    {
      path: 'detail',
      name: 'AccountDetail',
      hidden: true,
      component: () => import('@/views/account/detail/index'),
      meta: { title: 'Account', icon: 'blocks' }
    }
  ]
}
