import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import inits from '../components/uploadMain.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/uploadMain',
    },
    {
      path: '/uploadMain',
      name: 'uploadMain',
      component: inits,
      children: [
        {
          path: 'pushWord',
          name: 'pushWord',
          component: () => import('../components/pushWord.vue'),
        }
      ]
    },
    {
      path: '/detectMsg',
      name: 'detectMsg',
      component: () => import('../components/detectMsg.vue')
    },
    {
      path: '/detect/:id/:name/:index',
      name: 'detect',
      component: () => import('../components/detect.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../components/feedback.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../components/loading.vue')
    },
    {
      path: "/:pathMatch(.*)*", 
      component: () => import("../components/404.vue"), 
    }
  ]
})

export default router

