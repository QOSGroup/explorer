import Layout from '../views/layout/Layout'

export default {
  path: '/developer',
  component: Layout,
  redirect: '/developer/manager',
  name: 'Developer',
  meta: { title: 'Developer', icon: 'user' },
  children: [
    {
      path: 'manager',
      name: 'DeveloperManager',
      hidden: true,
      component: () => import('@/views/developer/manager/index'),
      meta: { title: 'Manager', icon: 'user', auth: true }
    },
    {
      path: 'login',
      name: 'DeveloperLogin',
      hidden: true,
      component: () => import('@/views/developer/login/index'),
      meta: { title: 'Login', icon: 'user' }
    },
    {
      path: 'register',
      name: 'DeveloperRegister',
      hidden: true,
      component: () => import('@/views/developer/register/index'),
      meta: { title: 'Register', icon: 'user' }
    }
  ]
}
