import { computed } from 'vue'
import _ from 'lodash'
import type { Ref } from 'vue'
import type { FormModel } from '@/services/activities'

export const useDirty = (current: Ref<FormModel>, form: Ref<FormModel>) => {
  const isDirty = computed(() => !_.isEqual(current.value, form.value))

  return { isDirty }
}
