import Layout from '../views/layout/Layout'

export default {
  path: '/validtor',
  component: Layout,
  redirect: '/validtor/list',
  name: 'Validtor',
  meta: {
    title: 'Validtor',
    icon: 'nested'
  },
  children: [{
    path: 'list',
    name: 'List',
    component: () =>
      import('@/views/validtor/list/index'),
    meta: {
      title: 'Validtors',
      icon: 'nested'
    }
  }]
}
