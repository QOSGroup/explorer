import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(res => res.meta.auth)) {
    // checkLogin({ token: store.getters.token }).then(data => {
    //   if (enums.apiStatus.success == data.status) {
    //     fn_SetTitle(to);
    //     next();
    //   }
    // });

    next({ path: '/developer/login' })
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
