import { ref, toRaw } from 'vue'
import type { Ref } from 'vue'
import type { FormModel } from '@/services/index'
import type { FormInstance, FormRules } from 'element-plus'

const useActivityForm = () => {
  // 表單工具
  const ruleFormRef = ref<FormInstance>()

  const rules = ref<FormRules<FormModel>>({
    title: [
      { required: true, message: '請填寫活動名稱', trigger: 'change' },
      { min: 3, max: 50, message: '請輸入3-50個字元', trigger: 'change' },
    ],
    status: [{ required: true, message: '請選擇活動狀態', trigger: 'blur' }],
    startAt: [{ required: true, message: '請選擇活動起日', trigger: 'change' }],
    dueAt: [{ required: true, message: '請選擇活動迄日', trigger: 'change' }],
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

  const resetForm = (editData: Ref<FormModel>, initialData: Ref<FormModel>) => {
    editData.value = structuredClone(toRaw(initialData.value))
  }

  return {
    ruleFormRef,
    rules,
    formValidate,
    resetForm,
  }
}
export default useActivityForm
