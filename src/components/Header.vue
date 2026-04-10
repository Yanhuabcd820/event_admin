<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  const errorRes = await authStore.logout()
  if (errorRes) {
    ElMessage({
      type: 'error',
      message: '登出功能異常，請稍後再試',
    })
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <el-header class="h-64px bg-white border-b border-gray-200 p-0 flex items-center min-w-768px">
    <div class="max-w-1200px mx-auto w-full px-24px flex justify-between items-center">
      <h1 class="text-20px font-semibold text-[var(--color-text-dark)]">
        <router-link to="/" class="no-underline color-inherit"> 活動管理平台 </router-link>
      </h1>
      <div class="flex gap-16px items-center">
        <router-link
          to="/activity"
          class="nav-link text-gray-600 no-underline px-12px py-8px rounded-4px transition-all duration-300"
          >活動管理</router-link
        >
        <router-link
          v-if="authStore.authStatus === 'unauthenticated'"
          to="/login"
          class="nav-link text-gray-600 no-underline px-12px py-8px rounded-4px transition-all duration-300"
          >登入</router-link
        >
        <button
          v-else
          @click="logout"
          class="nav-link text-gray-600 no-underline px-12px py-8px rounded-4px transition-all duration-300 border-transparent bg-transparent cursor-pointer"
        >
          登出
        </button>
      </div>
    </div>
  </el-header>
</template>

<style>
.nav-link:hover,
.nav-link.router-link-active {
  font-weight: 600;
  color: var(--el-color-primary);
}
</style>
