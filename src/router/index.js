import Vue from "vue"
import Router from "vue-router"
import store from "../store"
Vue.use(Router)
const routes = [
  {
    path: '/',
    component: () => import('@/views/index'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },

  {
    path: '/user',
    component: () => import('@/views/user'),
    meta: {
      requireAuth: true
    }
  }
]


const router = new Router({
  routes
});
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 检查是否需要登录权限
    if (store.state.token) { // 检查是否有token
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router