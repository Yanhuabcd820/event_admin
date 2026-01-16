import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

type AuthState = {
  token:string|null,
}


export const useAuthStore = defineStore('auth', () => {

  const authState = ref<AuthState>({
    token: null
  })
  const isLoggedIn = computed<boolean>(() => {
    return !!authState.value.token
  })
  const restoreToken=()=>{
    const tokenVal=localStorage.getItem("token")
    if(tokenVal){
      authState.value.token = tokenVal
    }
  }

  return {
    authState,
    isLoggedIn,
    restoreToken
  }
})

