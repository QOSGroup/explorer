import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { checkLogin } from './api/developer'

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.matched.some(res => res.meta.auth)) {
    checkLogin().then(data => {
      if (data.error && data.error.code === 401) {
        if (from.fullPath === '/developer/login') {
          NProgress.done()
        }
        next({ path: '/developer/login' })
      } else {
        next()
      }
      console.log(data)
    }).catch((error) => {
      console.log(error)
      NProgress.done()
      next({ path: '/developer/login' })
    })

    // next({ path: '/developer/login' })
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
