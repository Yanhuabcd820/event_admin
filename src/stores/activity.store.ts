import { defineStore } from 'pinia'
import type { Status, FilterStatus } from '@/types/activity'

// 狀態按鈕
export type StatusDetail = {
  name: string
  filterName: FilterStatus
}

export const useActivityStore = defineStore('activity', () => {
  const statusEnumMap: Record<Status | 'all', string> = {
    all: '全部活動',
    draft: '活動草稿',
    online: '活動上線中',
    offlineManual: '活動已下架',
    offlineExpired: '活動已過期',
  }

  const formStatusOptions: StatusDetail[] = [
    {
      name: statusEnumMap.draft,
      filterName: 'draft',
    },
    {
      name: statusEnumMap.online,
      filterName: 'online',
    },
    {
      name: statusEnumMap.offlineManual,
      filterName: 'offlineManual',
    },
  ]

  const filterButtons: StatusDetail[] = [
    { name: statusEnumMap.all, filterName: 'all' },
    ...formStatusOptions,
    { name: statusEnumMap.offlineExpired, filterName: 'offlineExpired' },
  ]

  return {
    statusEnumMap,
    formStatusOptions,
    filterButtons,
  }
})
