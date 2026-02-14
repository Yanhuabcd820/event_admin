import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CurrentActivity } from '@/services/index.ts'
import type { FormInstance, FormRules } from 'element-plus'

export const useActivityFormStore = defineStore('activityForm', () => {

  // 表單資料
  const formModel = ref<CurrentActivity>({
    title: '',
    id: '0',
    status: 'draft',
    createdAt: '',
    updatedAt: '',
    startAt: '',
    dueAt: '',
  })

  const currentActivity = ref<CurrentActivity>({
    title: '',
    id: '0',
    status: 'draft',
    createdAt: '',
    updatedAt: '',
    startAt: '',
    dueAt: '',
  })

  // 表單工具
  const ruleFormRef = ref<FormInstance>()

  const rules = ref<FormRules<typeof formModel>>({
    title: [
      { required: true, message: '請填寫活動名稱', trigger: 'change' },
      { min: 3, max: 50, message: '請輸入3-50個字元', trigger: 'change' }
    ],
    status: [
      { required: true, message: '請選擇活動狀態', trigger: 'blur' }
    ],
    startAt: [
      { required: true, message: '請選擇活動起日', trigger: 'change' }
    ],
    dueAt: [
      { required: true, message: '請選擇活動迄日', trigger: 'change' }
    ],
  })


  const editReset = () => {
    formModel.value = { ...currentActivity.value}
  }

  const formInitial = () => {
    formModel.value = {
      title: '',
      id: '0',
      status: 'draft',
      createdAt: '',
      updatedAt: '',
      startAt: '',
      dueAt: '',
    }
    
    currentActivity.value = {
      title: '',
      id: '0',
      status: 'draft',
      createdAt: '',
      updatedAt: '',
      startAt: '',
      dueAt: '',
    }
  }

  return{    
    currentActivity,
    ruleFormRef,
    formModel,
    rules,
    editReset,
    formInitial
  }
})