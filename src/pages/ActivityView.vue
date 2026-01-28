<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] px-16px py-24px min-w-768px box-border">
    <!-- 主容器 -->
    <div class="max-w-836px mx-auto">
      <!-- 標題列 -->
      <div class="flex items-center justify-between mb-24px">
        <h1 class="text-22px font-medium leading-32px text-[var(--color-text-dark)] m-0">
          活動管理
        </h1>
        <el-button type="info" :to="{ name: 'ActivityCreate' }" tag="router-link" class="no-underline">
          新增活動
        </el-button>
      </div>

      <!-- 狀態篩選 -->
      <div class="flex flex-wrap items-center gap-8px mb-16px">
        <span class="text-16px text-[var(--color-text-dark)] leading-32px">活動狀態</span>
        <el-button
        >
          全部活動
        </el-button>
        <el-button
        >
          活動上線中
        </el-button>
        <el-button
        >
          活動已下架
        </el-button>
        <el-button
        >
          活動已過期
        </el-button>
        <el-button
        >
          草稿
        </el-button>
      </div>

      <!-- 活動列表 -->
      <div class="flex flex-col gap-16px mb-24px">
        <el-card
          shadow="always"
          class="activity-card"
        >
          <template #header>
            <div class="flex items-start justify-between">
              <h2 class="text-22px font-medium leading-28px text-[var(--color-text-dark)] m-0 flex-1">
                2026馬到成功春酒會
              </h2>
              <el-tag
                type="primary"
                effect="plain"
                class="ml-12px"
              >
                活動上線中
              </el-tag>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 mt-4px">
              2026/02/27 ~ 2026/03/05
            </p>
          </template>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-8px">
              <el-button
                type="primary"
                link
                tag="router-link"
                class="underline-link"
                :to="{ name: 'ActivityEdit', params: { id: 1 } }"
              >
                編輯
              </el-button>
              <el-button
                type="primary"
                link
                class="underline-link"
              >
                下架
              </el-button>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 text-right">
              2026/01/07 建立
            </p>
          </div>
        </el-card>
        <el-card
          shadow="always"
          class="activity-card"
        >
          <template #header>
            <div class="flex items-start justify-between">
              <h2 class="text-22px font-medium leading-28px text-[var(--color-text-dark)] m-0 flex-1">
                秋遊會
              </h2>
              <el-tag
                type="primary"
                effect="plain"
                class="ml-12px"
              >
                活動已下架
              </el-tag>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 mt-4px">
              2026/01/17 ~ 2026/02/05
            </p>
          </template>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-8px">
              <el-button
                type="primary"
                link
                tag="router-link"
                class="underline-link"
                :to="{ name: 'ActivityEdit', params: { id: 2 } }"
              >
                編輯
              </el-button>
              <el-button
                type="primary"
                link
                class="underline-link"
              >
                下架
              </el-button>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 text-right">
              2026/02/07 建立
            </p>
          </div>
        </el-card>
      </div>

      <!-- 分頁器 -->
      <!-- <div class="flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          :total="180"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.activity-card :deep(.el-card__header) {
  padding: 16px;
}

.activity-card :deep(.el-card__body) {
  padding: 16px;
}
</style>