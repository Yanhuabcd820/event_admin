import { defineStore,storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { CurrentActivity } from '@/services/index.ts'
import {useActivityFormStore} from '@/stores/activityForm.store.ts'
import {apiFetchActivityByIdResponse,apiUpdateActivityResponse} from '@/services/index.ts'
import { ElMessage } from 'element-plus'

/**是否正在讀取資料 */
type IsFetching = boolean

/**是否正在更新資料 */
type IsUpdating = boolean

export const useActivityEditStore = defineStore('activityEdit', () => {

  const activityFormStore = useActivityFormStore()
  const { currentActivity, formModel } = storeToRefs(activityFormStore)

  const isFetching = ref<IsFetching>(false)
  const isUpdating = ref<IsUpdating>(false)

  const fetchActivityById = async (id: string) => {
    isFetching.value = true

    try {
      const res = await apiFetchActivityByIdResponse(id)
      currentActivity.value = res
      formModel.value = { ...res }

    } catch {
      ElMessage({
        type: 'error',
        message: '資料讀取失敗，請洽工作人員',
      })
    } finally {
      isFetching.value = false
    }
  }

  const updateActivity = async ({ id, payload }: { id: string; payload: CurrentActivity }) => {
    isUpdating.value = true
    try {
      const res = await apiUpdateActivityResponse({ id, payload })
      if (res.status === "success" && res.data) {
        currentActivity.value = res.data
        formModel.value = { ...res.data }
      }
      return res
      
    } catch (error) {
      return { status: "error", data: null, error:error }
    } finally {
      isUpdating.value = false
    }
  }

  return {
    isFetching,
    isUpdating,
    fetchActivityById,
    updateActivity
  }
})
