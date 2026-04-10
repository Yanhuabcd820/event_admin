import { ref } from 'vue'
import { getActivities, updateActivityStatus } from '@/repositories/activity.repository.ts'
import { useActivityStore } from '@/stores/activity.store'
import type { Status, FilterStatus } from '@/types/activity'
import type { StatusDetail } from '@/stores/activity.store.ts'
import type { Activity, ActivityResponse, ActivitiesResponse } from '@/services/activities'

type ActivitiesData = {
  list: Activity[]
  pageInfo: {
    currentPage: number
    pageSize: number
    totalCount: number
  }
  filters: FilterStatus
  error: string | null
}

const activitiesData = ref<ActivitiesData>({
  list: [],
  filters: 'all',
  pageInfo: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  },
  error: null,
})

const useActivityList = () => {
  const activityStore = useActivityStore()
  const { formStatusOptions } = activityStore


  const isActivityListLoading = ref(false)
  /**
   * fetchActivities - 用於根據當前頁面和篩選狀態從 API 獲取活動數據。
   * idle → loading → success
   * idle → loading → error
   * */
  const fetchActivities = async ({
    currentPage = 1,
    filterStatus = 'all',
  }: { currentPage?: number; filterStatus?: FilterStatus } = {}): Promise<
    ActivitiesResponse | undefined
  > => {
    if (isActivityListLoading.value) return
    isActivityListLoading.value = true
    activitiesData.value.error = null
    try {
      const res = await getActivities({ filterStatus, currentPage })
      if (res.status === 'success') {
        // 先判斷過期活動並自動更新狀態
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        for (const item of res.data.list) {
          if (item.dueAt && new Date(item.dueAt) < today && item.status !== 'offlineExpired') {
            await changeStatus({ id: item.id, status: 'offlineExpired' as Status })
            item.status = 'offlineExpired'
          }
        }
        activitiesData.value.list = res.data.list
        activitiesData.value.pageInfo = {
          currentPage: res.data.pageInfo.currentPage,
          pageSize: res.data.pageInfo.pageSize,
          totalCount: res.data.pageInfo.totalCount,
        }
      }
      return res
    } catch (error) {
      activitiesData.value.error = error instanceof Error ? error.message : String(error)
      return {
        status: 'error',
        data: null,
        error: activitiesData.value.error,
      }
    } finally {
      isActivityListLoading.value = false
    }
  }

  /**
   * changeFilter - 設置篩選狀態
   */
  const changeFilter = async (status: FilterStatus) => {
    activitiesData.value.filters = status
    activitiesData.value.pageInfo.currentPage = 1
    activitiesData.value.list = []
    const params = {
      filterStatus: activitiesData.value.filters,
      currentPage: activitiesData.value.pageInfo.currentPage,
    }
    await fetchActivities(params)
  }

  const changePage = async (page: number) => {
    activitiesData.value.pageInfo.currentPage = page
    activitiesData.value.list = []
    const params = { filterStatus: activitiesData.value.filters, currentPage: page }
    await fetchActivities(params)
  }

  const changeStatus = async ({
    id,
    status,
  }: {
    id: string
    status: Status
  }): Promise<ActivityResponse | undefined> => {
    const target = activitiesData.value.list.find((item) => item.id === id)
    if (!target) return
    const prevTargetStatus = target.status
    target.isUpdating = true
    target.status = status

    try {
      const res = await updateActivityStatus({ id, status })
      if (res.status === 'error') {
        target.status = prevTargetStatus
      }
      return res
    } catch (error) {
      target.status = prevTargetStatus
      return {
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : String(error),
      }
    } finally {
      target.isUpdating = false
    }
  }

  return {
    activitiesData,
    isActivityListLoading,
    fetchActivities,
    changeStatus,
    changeFilter,
    changePage,
  }
}
export default useActivityList
