import Layout from '../views/layout/Layout'

export default {
  path: '/node',
  component: Layout,
  redirect: '/node/list',
  name: 'Node',
  meta: { title: 'Node', icon: 'node' },
  children: [
    {
      path: 'list',
      name: 'NodeList',
      hidden: true,
      component: () => import('@/views/node/list/index'),
      meta: { title: 'List', icon: 'nested' },
      children: [
        {
          path: 'detail/:nodeDetailId?',
          name: 'NodeDetail',
          hidden: true,
          component: () => import('@/views/node/detail/index'),
          meta: { title: 'Detail', icon: 'nested' }
        }
      ]
    }
  ]
}
