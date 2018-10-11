import Layout from '../views/layout/Layout'

export default {
  path: '/block',
  component: Layout,
  redirect: '/block/list',
  name: 'Block',
  meta: { title: 'Block', icon: 'blocks' },
  children: [
    {
      path: 'list',
      name: 'BlockList',
      hidden: true,
      component: () => import('@/views/block/list/index'),
      meta: { title: 'List', icon: 'blocks' },
      children: [
        {
          path: 'detail/:height?',
          name: 'BlockDetail',
          hidden: true,
          component: () => import('@/views/block/detail/index'),
          meta: { title: 'Detail', icon: 'nested' }
        }
      ]
    }
  ]
}
