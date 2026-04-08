<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import useActivityForm from '@/composables/useActivityForm'
import { useRouter } from 'vue-router'
import type { FormLogin } from '@/services/auth'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
const activityForm = useActivityForm()

const { rulesLogin } = authStore
const ruleFormLoginRef = ref<FormInstance>()

// 登入資料
const formLogin = ref<FormLogin>({
  mail: '',
  password: '',
})

const loginError = ref(false)

const handleLogin = async () => {
  loginError.value = false
  try {
    const ifValid = await activityForm.formValidate(ruleFormLoginRef.value)
    if (!ifValid) {
      return
    }
    const result = await authStore.login(formLogin.value)
    if (result?.status === 'success') {
      router.push({ name: 'Activity' })
    } else {
      loginError.value = true
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] p-24px min-w-768px box-border">
    <!-- 主容器 -->
    <div class="max-w-768px mx-auto">
      <!-- 標題 -->
      <h1 class="text-22px font-medium leading-32px text-[var(--color-text-dark)] mb-24px">登入</h1>

      <!-- 登入表單區域 -->
      <el-form
        :model="formLogin"
        ref="ruleFormLoginRef"
        :rules="rulesLogin"
        label-width="80px"
        size="default"
        class="w-auto max-w-400px mx-auto"
      >
        <el-form-item label="帳號" prop="mail">
          <el-input v-model="formLogin.mail" placeholder="Please input" clearable />
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="formLogin.password"
            type="password"
            placeholder="Please input"
            show-password
          />
        </el-form-item>
        <div v-if="loginError" class="text-red-500 text-center text-14px">
          帳號密碼有誤，請重新再試
        </div>

        <el-form-item class="mt-64px" label-width="0">
          <div class="flex justify-center w-full">
            <el-button @click="handleLogin" type="info"> 登入 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss"></style>
