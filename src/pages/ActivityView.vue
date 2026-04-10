<script setup lang="ts">
import { onMounted } from 'vue'
import { useActivityStore } from '@/stores/activity.store'
import useActivityList from '@/composables/useActivityList'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Status } from '@/types/activity'

const activityStore = useActivityStore()
const { statusEnumMap } = activityStore
const activityList = useActivityList()
const { activitiesData, isActivityListLoading } = activityList

const setOfflineManualStatus = async ({ id, status }: { id: string; status: Status }) => {
  try {
    await ElMessageBox.confirm('是否確認下架活動?', {
      confirmButtonText: '是',
      cancelButtonText: '否',
    })
    const res = await activityList.changeStatus({ id, status })
    if (res?.status === 'success') {
      ElMessage({ type: 'success', message: '活動已下架' })
    } else {
      ElMessage({
        type: 'error',
        message: '資料讀取失敗，請洽工作人員',
      })
    }
  } catch (error) {
    ElMessage({ type: 'info', message: '取消下架' })
  }
}

onMounted(async () => {
  try {
    const res = await activityList.fetchActivities()
    if (res?.status === 'error') {
      ElMessage({
        type: 'error',
        message: res.error || '資料讀取失敗，請洽工作人員',
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-[var(--color-bg-page)] px-16px py-24px min-w-768px box-border"
    v-loading="isActivityListLoading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- 主容器 -->
    <div class="max-w-836px mx-auto">
      <!-- 標題列 -->
      <div class="flex items-center justify-between mb-24px">
        <h1 class="text-22px font-medium leading-32px text-[var(--color-text-dark)] m-0">
          活動管理
        </h1>
        <el-button
          type="info"
          :to="{ name: 'ActivityCreate' }"
          tag="router-link"
          class="no-underline"
        >
          新增活動
        </el-button>
      </div>
      <!-- 狀態篩選 -->
      <div class="flex flex-wrap items-center gap-8px mb-16px">
        <span class="text-16px text-[var(--color-text-dark)] leading-32px">活動狀態</span>
        <el-button
          v-for="(btn, idx) in activityStore.filterButtons"
          :key="`btn-${idx}`"
          @click="activityList.changeFilter(btn.filterName)"
          :type="btn.filterName === activitiesData.filters ? 'primary' : 'default'"
        >
          {{ btn.name }}
        </el-button>
      </div>

      <!-- 活動列表 -->
      <div class="flex flex-col gap-16px mb-24px">
        <el-empty v-if="activitiesData.list.length === 0" description="尚無活動" />
        <el-card
          shadow="always"
          class="activity-card"
          v-for="activity in activitiesData.list"
          :key="activity.id"
          v-loading.lock="activity.isUpdating"
        >
          <template #header>
            <div class="flex items-start justify-between">
              <h2
                class="text-22px font-medium leading-28px text-[var(--color-text-dark)] m-0 flex-1"
              >
                {{ activity.title }}
              </h2>
              <el-tag type="primary" effect="plain" class="ml-12px">
                {{ statusEnumMap[activity.status] }}
              </el-tag>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 mt-4px">
              {{ activity.startAt }} ~ {{ activity.dueAt }}
            </p>
          </template>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-8px">
              <el-button
                type="primary"
                link
                tag="router-link"
                class="underline-link"
                :to="{ name: 'ActivityEdit', params: { id: activity.id } }"
              >
                編輯
              </el-button>
              <el-button
                :disabled="activity.status !== 'online' || activity.isUpdating"
                type="primary"
                link
                class="underline-link"
                @click="setOfflineManualStatus({ id: activity.id, status: 'offlineManual' })"
              >
                下架
              </el-button>
            </div>
            <p class="text-14px leading-20px text-[var(--color-text-dark)] m-0 text-right">
              {{ activity.createdAt }} 建立
            </p>
          </div>
        </el-card>
      </div>
      <!-- 分頁器 -->
      <!-- <div class="flex justify-center">
        <el-pagination
          v-model:current-page="activitiesData.pageInfo.currentPage"
          :page-size="10"
          :total="activitiesData.pageInfo.totalCount"
          layout="prev, pager, next"
          @current-change="activityList.changePage"
          hide-on-single-page
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
