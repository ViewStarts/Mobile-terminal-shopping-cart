import { createRouter, createWebHashHistory } from 'vue-router'

// import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      component: () => import('@/views/HomeView.vue'),
      meta: {
        islog: true,
        showTab: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: {
        showTab: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SettingView.vue'),
      meta: {
        islog: true,
        showTab: true
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/FriendsView.vue'),
      meta: {
        showTab: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: {
        islog: true,
        phone: '',
        passd: ''
      }
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('../views/reg.vue'),
      meta: {
        islog: true,
        phone: '',
        passd: ''
      }
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/details.vue'),
      meta: {
        islog: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/MyView.vue'),
      meta: {
        islog: true,
        showTab: true
      }
    },
    {
      path: '/bian',
      name: 'bian',
      component: () => import('../views/editorView.vue'),
      meta: {
        islog: true,
        showTab: true
      }
    }
  ]
})
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  let utoken = localStorage.getItem('utoken')
  if (to.meta.islog || utoken) {
    return true
  } else {
    return { name: 'reg' }
  }
})
export default router
