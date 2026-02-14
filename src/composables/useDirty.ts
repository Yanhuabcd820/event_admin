import { computed } from 'vue'
import _ from 'lodash'
import type {Ref}from 'vue'
import type { CurrentActivity } from '@/services/index.ts'

export const useDirty = (current:Ref<CurrentActivity>, form:Ref<CurrentActivity>) => {
  
  const isDirty = computed(() => !_.isEqual(current.value, form.value))
  return { isDirty }
}
