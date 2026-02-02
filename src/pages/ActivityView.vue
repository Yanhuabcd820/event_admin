<script setup lang="ts">
import {ref} from 'vue'
import {useActivityStore} from '@/stores/activity.store'
import type {Activity, Status} from '@/stores/activity.store'
import { ElMessage, ElMessageBox } from 'element-plus'

const {activityData} = useActivityStore()
console.log('activityData',activityData);

const statusLabelMap:Record<Status, string> = {
  online: '活動上線中',
  offlineManual: '活動已下架',
  offlineExpired: '活動已過期',
  draft: '活動草稿',
  all: '全部'
}

const offlineConfirm = (id:string) => {
  ElMessageBox.confirm(
    '是否確認下架活動?',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '活動已刪除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消刪除',
      })
    })
}

const currentPage = ref<number>(1)
const handlePageChange = (page: number) => {
  currentPage.value = page
  // TODO: 實際應該呼叫 API 取得對應頁數的資料
}
const filterActivity=(status:string)=>{
  // TODO: 實際應該呼叫 API 取得對應狀態的活動資料

}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] px-16px py-24px min-w-768px box-border">
    <!-- 主容器 -->
    <div class="max-w-836px mx-auto">
      <!-- 標題列 -->
      <div class="flex items-center justify-between mb-24px" v-if="activityData.loadingStatus==='success'">
        <h1 class="text-22px font-medium leading-32px text-[var(--color-text-dark)] m-0">
          活動管理
        </h1>
        <el-button type="info" :to="{ name: 'ActivityCreate' }" tag="router-link" class="no-underline">
          新增活動
        </el-button>
      </div>
      <!-- 狀態篩選 -->
      <div class="flex flex-wrap items-center gap-8px mb-16px" v-if="activityData.loadingStatus==='success'">
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

      <div v-if="activityData.loadingStatus==='loading'" v-loading.lock="true" 
      element-loading-background="rgba(0, 0, 0, 0.8)">
      </div>
      <el-empty v-else-if="activityData.loadingStatus==='error'" :description="activityData.error || '資料讀取失敗，請洽工作人員'" />
      <!-- 活動列表 -->
      <div class="flex flex-col gap-16px mb-24px" v-else-if="activityData.loadingStatus==='success'">
        <el-empty v-if="activityData.list.length === 0" description="尚無活動" />
        <el-card v-else
          shadow="always"
          class="activity-card"
          v-for="activity in activityData.list"
          :key="activity.id"
        >
          <template #header>
            <div class="flex items-start justify-between">
              <h2 class="text-22px font-medium leading-28px text-[var(--color-text-dark)] m-0 flex-1">
                {{ activity.title }}
              </h2>
              <el-tag
                type="primary"
                effect="plain"
                class="ml-12px"
              >
                {{ statusLabelMap[activity.status] }}
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
                type="primary"
                link
                class="underline-link"
                @click="offlineConfirm(activity.id)"
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
      <div class="flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          :total="activityData.list.length"
          layout="prev, pager, next"
          @current-change="handlePageChange"
          hide-on-single-page
        />
      </div>
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