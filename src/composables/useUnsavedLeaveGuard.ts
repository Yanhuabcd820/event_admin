import { onMounted, onUnmounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import type { ActivityResponse } from '@/services/activities'

export const useUnsavedLeaveGuard = (
  isDirty: Ref<boolean>,
  onSave: () => Promise<ActivityResponse | undefined>,
) => {
  const beforeWindowUnload = (e: BeforeUnloadEvent) => {
    if (isDirty.value) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  onMounted(() => {
    window.addEventListener('beforeunload', beforeWindowUnload)
  })
  onUnmounted(() => {
    window.removeEventListener('beforeunload', beforeWindowUnload)
  })

  onBeforeRouteLeave(async () => {
    if (!isDirty.value) return true
    try {
      await ElMessageBox.confirm('資料已變動，是否儲存?', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      })

      const res = await onSave()
      if (res?.status === 'success') return true
      else return false
    } catch (error) {
      ElMessage({
        type: 'info',
        message: '取消儲存',
      })
      return true
    }
  })
}
