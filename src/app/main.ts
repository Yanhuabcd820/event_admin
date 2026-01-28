import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import '@/styles/variables.scss'
import '@/styles/element-plus-overrides.scss'

import App from './App.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)

const authStore = useAuthStore()
authStore.restoreToken()
app.use(router)

app.mount('#app')
