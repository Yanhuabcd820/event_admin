import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginAuth, signOutAuth } from '@/services/auth.ts'
import { supabase } from '@/services/supabaseClient'
import type { FormLogin } from '@/services/auth'
import type { AuthStatus } from '@/types/activity'
import type { FormRules } from 'element-plus'


export const useAuthStore = defineStore('auth', () => {

  const authStatus = ref<AuthStatus>('unauthenticated')

  // 初始化時同步 Supabase 登入狀態
  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      authStatus.value = 'authenticated'
    } else {
      authStatus.value = 'unauthenticated'
    }
  }
  
  // 表單工具
  const rulesLogin = ref<FormRules<FormLogin>>({
    mail: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
    password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
  })

  const login = async (loginData: FormLogin) => {
    const res = await loginAuth(loginData)
    if (res && res.status === 'success') {
      authStatus.value = 'authenticated'
      return res
    } else {
      authStatus.value = 'unauthenticated'
      return res
    }
  }

  const logout = () => {
    signOutAuth()
  }

  return {
    authStatus,
    rulesLogin,
    login,
    logout,
    checkAuth,
  }
})
