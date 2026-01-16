import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const app = createApp(App)

app.use(createPinia())

const authStore = useAuthStore()
authStore.restoreToken()
app.use(router)

app.mount('#app')
