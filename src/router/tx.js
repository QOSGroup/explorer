import Layout from '../views/layout/Layout'

export default {
  path: '/tx',
  component: Layout,
  redirect: '/tx/list',
  name: 'Tx',
  meta: { title: 'Tx', icon: 'blocks' },
  children: [
    {
      path: 'list',
      name: 'TxList',
      hidden: true,
      component: () => import('@/views/tx/list/index'),
      meta: { title: 'List', icon: 'txs' },
      children: [
        {
          path: 'detail/:hash?',
          name: 'TxDetail',
          hidden: true,
          component: () => import('@/views/tx/detail/index'),
          meta: { title: 'Detail', icon: 'nested' }
        }
      ]
    }
  ]
}
