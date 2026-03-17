import { ref } from 'vue'
import { apiCreateActivityResponse } from '@/services/index.ts'
import type { FormModel, ActivityResponse } from '@/services/index'
/**是否正在創建資料 */
type IsCreating = boolean
const useActivityCreate=()=>{

  const isCreating = ref<IsCreating>(false)

  const createActivity = async (payload:FormModel) : Promise<ActivityResponse | undefined> =>  {
    if(isCreating.value) return
    isCreating.value = true
    try {
      const res = await apiCreateActivityResponse({payload})
      
      return res
        
    } catch (error) {
      
      return {
        status: 'error',
        data: null, 
        error: error instanceof Error ? error.message : String(error)
      }
    } finally {
      isCreating.value = false
    }
  }

  return {
    isCreating,
    createActivity
  }
}

export default useActivityCreate