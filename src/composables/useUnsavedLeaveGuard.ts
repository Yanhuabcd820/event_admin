import { onMounted, onUnmounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import type { UpdateActivityResponse } from '@/services/index.ts'

export const useUnsavedLeaveGuard=(isDirty: Ref<boolean>, onSave: () => Promise<any>) =>{

  const beforeWindowUnload = (e: BeforeUnloadEvent) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  onMounted(()=>{
    window.addEventListener('beforeunload', beforeWindowUnload)
  })
  onUnmounted(()=>{
    window.removeEventListener('beforeunload', beforeWindowUnload)
  })

  onBeforeRouteLeave(async () => {
    if (!isDirty.value) return true
    try {
      await ElMessageBox.confirm(
        '資料已變動，是否儲存?', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        }
      )

      const res: UpdateActivityResponse = await onSave()
      if(res.status === 'success'){
        ElMessage({
          type: 'error',
          message: '資料已儲存',
        })
        return true
        
      }else{
        ElMessage({
          type: 'error',
          message: '資料儲存失敗，請稍後再試',
        })
        return false
      }
    } catch(err) {
      ElMessage({
        type: 'info',
        message: '取消儲存',
      })
      return true
    }
  })
}