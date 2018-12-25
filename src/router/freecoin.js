import Layout from '../views/layout/Layout'

export default {
  path: '/freecoin',
  component: Layout,
  redirect: '/freecoin/get',
  name: 'Freecoin',
  meta: { title: 'Freecoin', icon: 'example' },
  children: [
    {
      path: 'get',
      name: 'FreecoinDetail',
      hidden: true,
      component: () => import('@/views/freecoin/index'),
      meta: { title: 'FreecoinDetail', icon: 'example' }
    }
  ]
}
