<script setup lang="ts">
// 儲存草稿
const handleSaveDraft = async () => {
  
}

// 上架活動
const handlePublish = async () => {
  
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] py-24px min-w-768px">
    <div class="max-w-836px mx-auto px-24px">
      <!-- 頁面標題 -->
      <div class="mb-32px">
        <h1 class="text-22px font-medium text-[var(--color-text-dark)] leading-28px m-0">
          活動管理 - 新增活動
        </h1>
      </div>

      <!-- 表單內容 -->
        <el-form
          class="w-auto max-w-640px mx-auto"
        >
          <!-- 活動名稱 -->
          <el-form-item label="活動名稱" prop="title" required>
            <el-input
              placeholder="Please input"
            />
          </el-form-item>

          <!-- 活動狀態 -->
          <el-form-item label="活動狀態" prop="status" required>
            <el-select
              placeholder="Select"
              class="w-full"
            >
              <el-option
                key="online"
                label="活動上線中"
                value="online"
              />
            </el-select>
          </el-form-item>

          <!-- 活動起日 -->
          <el-form-item label="活動起日" prop="startAt" required>
            <el-date-picker
              type="date"
              placeholder="Pick a date"
            />
          </el-form-item>

          <!-- 活動迄日 -->
          <el-form-item label="活動迄日" prop="dueAt" required>
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              class="w-full"
            />
          </el-form-item>

          <!-- 操作按鈕 -->
          <el-form-item class="mt-64px">
            <div class="flex gap-44px justify-center w-full">
              <el-button @click="handleSaveDraft">
                儲存草稿
              </el-button>
              <el-button @click="handlePublish">
                上架活動
              </el-button>
            </div>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.el-button + .el-button {
  margin-left: 0px; 
}
</style>
