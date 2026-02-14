import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import type { AuthStatus } from '@/types/activity'

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
      const result = await tokenApi()
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
  const tokenApi = async()=>{
    // Call API to verify token return
    return true
  }

  return {
    authToken,
    authStatus,
    isLoggedIn,
    restoreToken,
    verifyToken
  }
})

