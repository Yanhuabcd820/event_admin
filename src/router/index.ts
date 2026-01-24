import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/pages/LoginView.vue'
import Activity from '@/pages/ActivityView.vue'
import ActivityEdit from '@/pages/ActivityEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component: Login,
      meta:{ifLogin:true}
    },
    {
      path:'/activities',
      component: Activity,
      meta:{requiresAuth:true}
    },
    {
      path:'/activities/:id/edit',
      component: ActivityEdit,
      meta:{requiresAuth:true}
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  if(authStore.authStatus==='pending'){
    await authStore.verifyToken()
  }
  
  if(to.meta.requiresAuth && authStore.authStatus==='unauthenticated'){
    return {path:'/login'}
  }else if(to.meta.ifLogin && authStore.authStatus==='authenticated'){
    return {path:'/activities'}
  }

})

export default router
