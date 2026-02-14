import type { FormInstance } from 'element-plus'

export const useFormValidate=()=> {
  const formValidate = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    try {
      const valid = await formEl.validate()
      return valid
    } catch {
      return false
    }
  }
  return { formValidate }
}