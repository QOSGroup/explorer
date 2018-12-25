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

  // Vue.nextTick(() => {
  //   setTimeout(() => {
  //     const app_cons = document.querySelectorAll('.app-main')
  //     console.log(app_cons)
  //     // console.log(app_cons[0].querySelector('#qfooter'))
  //     if (app_cons && app_cons.length > 0 && !app_cons[0].querySelector('#qfooter')) {
  //       const app_con = app_cons[0]
  //       console.log(app_con)
  //       const footer = document.createElement('div')
  //       footer.id = 'qfooter'
  //       footer.style.fontSize = '12px'
  //       footer.style.padding = '20px 0'
  //       footer.style.color = '#fff'
  //       footer.style.textAlign = 'center'
  //       footer.style.marginTop = '-50px'
  //       footer.innerText = '京ICP备18040697号-1'
  //       app_con.appendChild(footer)
  //     }
  //   }, 600)
  // })
})
