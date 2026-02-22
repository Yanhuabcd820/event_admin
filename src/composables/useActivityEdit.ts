import { ref } from 'vue'
import { apiFetchActivityByIdResponse, apiUpdateActivityResponse } from '@/services/index.ts'
import type { FormModel, ActivityResponse } from '@/services/index'

/**是否正在讀取資料 */
type IsFetching = boolean

/**是否正在更新資料 */
type IsUpdating = boolean


const useActivityEdit=()=>{

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

  const fetchActivityById = async (id: string) : Promise<ActivityResponse | undefined> => {
    if(isFetching.value) return
    isFetching.value = true

    try {
      const res = await apiFetchActivityByIdResponse(id)
      if (res.status === "success") {
        activityById.value = structuredClone(res.data)
      } 
      return res

    } catch (error) {
      return {
        status: 'error',
        data: null, 
        error: error instanceof Error ? error.message : String(error)
      }
    } finally {
      isFetching.value = false
    }
  }

  const updateActivity = async ({ id, payload }: { id: string; payload: FormModel }) : Promise<ActivityResponse | undefined> =>  {
    if(isUpdating.value) return
    isUpdating.value = true
    try {
      const res = await apiUpdateActivityResponse({ id, payload })
      if (res.status === "success") {
        activityById.value = structuredClone(res.data)
      } 
      return res
        
    } catch (error) {
      return {
        status: 'error',
        data: null, 
        error: error instanceof Error ? error.message : String(error)
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
    updateActivity
  }
}
export default useActivityEdit