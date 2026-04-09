import { ref, toRaw, watch } from 'vue'
import type { Ref } from 'vue'
import type { FormModel } from '@/services/activities'
import type { FormInstance, FormRules } from 'element-plus'

const useActivityForm = () => {

  // 表單資料
  const formModel = ref<FormModel>({
    title: '',
    status: 'draft',
    startAt: '',
    dueAt: '',
  })

  const snapShot = ref<FormModel>({
    title: '',
    status: 'draft',
    startAt: '',
    dueAt: '',
  })

  // 表單工具
  const ruleFormRef = ref<FormInstance>()

  const rules = ref<FormRules<FormModel>>({
    title: [
      { required: true, message: '請填寫活動名稱', trigger: 'change' },
      { min: 3, max: 50, message: '請輸入3-50個字元', trigger: 'change' },
    ],
    status: [{ required: true, message: '請選擇活動狀態', trigger: 'change' }],
    startAt: [{ required: true, message: '請選擇活動起日', trigger: 'change' },
      {
        validator: (rule, value, callback) => {
          const dueAt = formModel.value?.dueAt
          if (!dueAt || !value) return callback()
          if (value > dueAt) {
            callback(new Error('活動起日不得晚於活動迄日'))
          } else {
            callback()
          }
        },
        trigger: 'change',
      },],
    dueAt: [
      { required: true, message: '請選擇活動迄日', trigger: 'change' },
      {
        validator: (rule, value, callback) => {
          const startAt = formModel.value?.startAt
          if (!startAt || !value) return callback()
          if (value < startAt) {
            callback(new Error('活動迄日不得早於活動起日'))
          } else {
            callback()
          }
        },
        trigger: 'change',
      },
    ],
  })

  const formValidate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    try {
      const valid = await formEl.validate()
      return valid
    } catch {
      return false
    }
  }

  // 讓活動迄日不能選擇小於起日的日期
  const disableDueAtDate = (date: Date) => {
    const startAt = formModel.value?.startAt
    if (!startAt) return false
    return date < new Date(startAt)
  }

  // 自動判斷過期就改狀態
  const autoUpdateStatusIfExpired = () => {
    if (!formModel.value.dueAt) return
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(formModel.value.dueAt) < today) {
      formModel.value.status = 'offlineExpired'
    }else{
      formModel.value.status = 'draft'
    }
  }
  
  // 監聽 dueAt，自動更新status狀態
  watch(
    () => formModel.value.dueAt,
    (newVal,oldVal) => {
      if (!newVal) return
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const newDate = new Date(newVal)
      const oldDate = new Date(oldVal)
      if (newDate < today) {
        formModel.value.status = 'offlineExpired'
      } else if (oldDate < today && newDate > today ) {
        formModel.value.status = 'draft'
      }
    }
  )

  const resetForm = (editData: Ref<FormModel>, initialData: Ref<FormModel>) => {
    editData.value = structuredClone(toRaw(initialData.value))
    ruleFormRef?.value?.validate()
  }

  return {
    formModel,
    snapShot,
    ruleFormRef,
    rules,
    formValidate,
    resetForm,
    disableDueAtDate
  }
}
export default useActivityForm
