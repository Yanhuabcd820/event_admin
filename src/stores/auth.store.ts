import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { apiFetchAuthResponse, apiVerifyToken } from '@/services/auth.ts'
import type { FormLogin } from '@/services/auth'
import type { AuthStatus } from '@/types/activity'
import type { FormRules } from 'element-plus'

type AuthToken = string|null

export const useAuthStore = defineStore('auth', () => {

  const authToken = ref<AuthToken>(null)
  let verifyingPromise:Promise<void>|null=null
  const authStatus = ref<AuthStatus>("unauthenticated")
  const isLoggedIn = computed<boolean>(() => {
    return authStatus.value === "authenticated"
  })

  const restoreToken=()=>{
    const tokenVal=localStorage.getItem("token")
    if(tokenVal){
      authToken.value = tokenVal
    }
  }

  const runVerifyToken = async()=>{
    if(!authToken.value){
      authStatus.value = 'unauthenticated'
      return 
    }

    try{
      const result = await apiVerifyToken(authToken.value)
      if(result){
        authStatus.value = 'authenticated'
      }else{
        authStatus.value = 'unauthenticated'
        authToken.value = null
        localStorage.removeItem('token')
      }
    }catch{
      authStatus.value = 'unauthenticated'
      authToken.value = null
      localStorage.removeItem('token')
    }finally{
      verifyingPromise=null
    }

  }

  const verifyToken = async()=>{
    if(!verifyingPromise){
      authStatus.value = 'pending'
      verifyingPromise = runVerifyToken()
    }
    return verifyingPromise
  }


  // 表單工具
  const rulesLogin = ref<FormRules<FormLogin>>({
    username: [
      { required: true, message: '請輸入帳號', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '請輸入密碼', trigger: 'blur' }
    ]
  })
  
  const login = async (loginData: object) => {
    const res = await apiFetchAuthResponse(loginData)
    if (res && res.status === 'success' && res.data) {
      authToken.value = res.data.token
      localStorage.setItem('token', res.data.token)
      authStatus.value = 'authenticated'
      return res
    } else {
      authToken.value = null
      localStorage.removeItem('token')
      authStatus.value = 'unauthenticated'
      return res
    }
  }

  return {
    authToken,
    authStatus,
    isLoggedIn,
    rulesLogin,
    login,
    restoreToken,
    verifyToken
  }
})

