import Layout from '../views/layout/Layout'

export default {
  path: '/query',
  component: Layout,
  redirect: '/query/list',
  name: 'Query',
  meta: { title: 'Query', icon: 'blocks' },
  children: [
    {
      path: 'list',
      name: 'QueryList',
      hidden: true,
      component: () => import('@/views/query/list/index'),
      meta: { title: 'List', icon: 'blocks' },
      children: [
        {
          path: 'detail/:queryId?',
          name: 'QueryDetail',
          hidden: true,
          component: () => import('@/views/query/detail/index'),
          meta: { title: 'Detail', icon: 'nested' }
        }
      ]
    }
  ]
}
