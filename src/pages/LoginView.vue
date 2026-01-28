<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] p-24px min-w-768px box-border">
    <!-- 主容器 -->
    <div class="max-w-768px mx-auto">
      <!-- 標題 -->
      <h1 class="text-22px font-medium leading-32px text-[var(--color-text-dark)] mb-24px">
        登入
      </h1>

      <!-- 登入表單區域 -->
        <el-form
          label-width="80px"
          size="default"
          class="w-auto max-w-400px mx-auto"
        >
          <el-form-item label="帳號" prop="username">
            <el-input
              placeholder="Please input"
              clearable
            />
          </el-form-item>

          <el-form-item label="密碼" prop="password">
            <el-input
              type="password"
              placeholder="Please input"
              show-password
            />
          </el-form-item>

          <el-form-item class="mt-64px" label-width="0">
            <div class="flex justify-center w-full">
              <el-button
                type="info"
              >
                登入
              </el-button>
            </div>
          </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<style lang="scss">
</style>