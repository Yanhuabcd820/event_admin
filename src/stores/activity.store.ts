import { defineStore } from 'pinia'
import type { Status, FilterStatus } from '@/types/activity'

// 狀態按鈕
export type StatusDetail = {
  name: string
  filterName: FilterStatus
}

export const useActivityStore = defineStore('activity', () => {

  const statusEnumMap:Record<Status, string> = {
    online: '活動上線中',
    offlineManual: '活動已下架',
    offlineExpired: '活動已過期',
    draft: '活動草稿'
  }

  const formStatusOptions:StatusDetail[]=[
    {
      name:'活動上線中',
      filterName:'online'
    },
    {
      name:'活動已下架',
      filterName:'offlineManual'
    },
    {
      name:'活動已過期',
      filterName:'offlineExpired'
    },
    {
      name:'草稿',
      filterName:'draft'
    }
  ]

  return { 
    statusEnumMap,
    formStatusOptions
   }

})