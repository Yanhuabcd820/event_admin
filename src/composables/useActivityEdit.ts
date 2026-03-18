import { ref } from 'vue'
import { getActivityById, updateTheActivity } from '@/repositories/activity.repository.ts'
import type { FormModel, ActivityResponse } from '@/services/index'

/**是否正在讀取資料 */
type IsFetching = boolean

/**是否正在更新資料 */
type IsUpdating = boolean

const useActivityEdit = () => {
  const isFetching = ref<IsFetching>(false)
  const isUpdating = ref<IsUpdating>(false)

  const activityById = ref<FormModel>({
    title: '',
    id: '0',
    status: 'draft',
    createdAt: '',
    updatedAt: '',
    startAt: '',
    dueAt: '',
  })

  let latestRequestId = 0
  const fetchActivityById = async (id: string): Promise<ActivityResponse | undefined> => {
    const thisRequestId = ++latestRequestId
    isFetching.value = true
    try {
      const res = await getActivityById(id)
      // 只更新最新請求的資料
      if (thisRequestId !== latestRequestId) return

      if (res.status === 'success') {
        activityById.value = structuredClone(res.data)
      }
      return res
    } catch (error) {
      if (thisRequestId !== latestRequestId) return
      return {
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : String(error),
      }
    } finally {
      // 只在最新請求結束時才關閉 loading
      if (thisRequestId === latestRequestId) {
        isFetching.value = false
      }
    }
  }

  const updateActivity = async ({
    id,
    payload,
  }: {
    id: string
    payload: FormModel
  }): Promise<ActivityResponse | undefined> => {
    if (isUpdating.value) return
    isUpdating.value = true
    try {
      const res = await updateTheActivity({ id, payload })
      if (res?.status === 'success') {
        activityById.value = structuredClone(res.data)
      }
      return res
    } catch (error) {
      return {
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : String(error),
      }
    } finally {
      isUpdating.value = false
    }
  }

  return {
    isFetching,
    isUpdating,
    activityById,
    fetchActivityById,
    updateActivity,
  }
}
export default useActivityEdit
