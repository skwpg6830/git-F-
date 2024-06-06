import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '國家公園介紹網'
      }
    },
    {
      path: '/yangminshan',
      name: 'yangminshan',
      component: () => import('@/views/YangMingShanView.vue'),
      meta: {
        title: '陽明山'
      }
      // beforeEnter () {}
    }
  ]
})

// 進入每一頁前
// to = 目標頁面
// from = 來源頁面
// next = 重新導向或繼續
router.beforeEach((to, from, next) => {
  if (to.name !== 'home') {
    const input = prompt('輸入密碼')
    if (input === '123') {
      next()
    } else {
      // next('/')
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

// 進入每一頁後執行
// to = 目標頁面
// from = 來源頁面
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
