import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/pages/LoginView.vue'
import Activity from '@/pages/ActivityView.vue'
import ActivityCreate from '@/pages/ActivityCreateView.vue'
import ActivityEdit from '@/pages/ActivityEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component: Login,
      name: 'Login',
      // meta:{ifLogin:true}
    },
    {
      path:'/activity',
      component: Activity,
      name: 'Activity',
      // meta:{requiresAuth:true}
    },
    {
      path:'/activity/create',
      component: ActivityCreate,
      name: 'ActivityCreate',
      // meta:{requiresAuth:true}
    },
    {
      path:'/activity/:id/edit',
      component: ActivityEdit,
      name: 'ActivityEdit',
      // meta:{requiresAuth:true}
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
    return {path:'/activity'}
  }

})

export default router
