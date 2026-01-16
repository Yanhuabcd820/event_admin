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

  return {
    authState,
    isLoggedIn
  }
})

