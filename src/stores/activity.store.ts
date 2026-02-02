import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

/**
 * Status - 活動狀態
 * online: 活動上線中
 * offlineManual: 活動已下架
 * offlineExpired: 活動時間到期自動下架
 * draft: 活動草稿
*/
export type Status = 'online' | 'offlineManual' | 'offlineExpired' | 'draft' | 'all'

export type Activity = {
  title: string,
  id:string,
  status:Status,
  createdAt:string,
  updatedAt:string,
  startAt:string,
  dueAt:string,
}
/**
 * ActivityData.status - 活動資料讀取狀態
 * idle: 尚未讀取資料
 * loading: 資料讀取中
 * success: 資料讀取成功
 * error: 資料讀取失敗
*/
type ActivityData = {
  loadingStatus:'idle' | 'loading' | 'success' | 'error',
  list:Activity[],
  pageInfo:{
    currentPage: number,
    pageSize: number,
    totalPages: number
  },
  filters: Status, 
  error:string|null
}
type ActivityResponse = {
  list:Activity[],
  pageInfo:{
    currentPage: number,
    pageSize: number,
    totalPages: number
  },
  filters: Status
}

export const useActivityStore = defineStore('activity', () => {
  const activityData = ref<ActivityData>({
    loadingStatus: 'idle',
    list: [
      {
        title: '秋遊會',
        id:'1',
        status:'online',
        createdAt: '2026/01/07',
        updatedAt:'2026/01/17',
        startAt:'2026/02/27',
        dueAt:'2026/03/05',
      },
      {
        title: '2026馬到成功春酒會',
        id:'2',
        status:'offlineManual',
        createdAt: '2026/02/07',
        updatedAt:'2026/02/17',
        startAt:'2026/03/27',
        dueAt:'2026/05/05',
      },
      {
        title: '馬到成功',
        id:'3',
        status:'offlineExpired',
        createdAt: '2025/11/07',
        updatedAt:'2025/12/17',
        startAt:'2026/01/27',
        dueAt:'2026/05/05',
      },
      {
        title: '馬到成功',
        id:'4',
        status:'draft',
        createdAt: '2025/01/07',
        updatedAt:'2025/02/17',
        startAt:'2025/11/27',
        dueAt:'2025/12/05',
      },
      {
        title: '2025馬到成功',
        id:'5',
        status:'draft',
        createdAt: '2025/01/07',
        updatedAt:'2025/02/17',
        startAt:'2025/11/27',
        dueAt:'2025/12/05',
      },
    ],
    filters:'all',
    pageInfo:{
      currentPage: 1,
      pageSize: 10,
      totalPages: 20
    },
    error: null
  })

  const activityResponse = async({filterStatus,currentPage}: {filterStatus: string | null, currentPage: number}):Promise<ActivityResponse>=>{
    return{
        list:[
          {
            title: 'title',
            id:'vda123',
            status: 'online',
            createdAt:'20201213',
            updatedAt:'20201213',
            startAt:'20201213',
            dueAt:'20201213',
            
          }
        ],
        pageInfo:{
          currentPage: 2,
          pageSize: 20,
          totalPages: 20
        },
        filters: 'all', 
      }
    
  }

  /**
   * fetchActivities - 用於根據當前頁面和篩選狀態從 API 獲取活動數據。
   * idle → loading → success
   * idle → loading → error
   * */
  const fetchActivities = async ({currentPage=1, filterStatus='all'}) => {
    if(activityData.value.loadingStatus === 'loading') return

    activityData.value.loadingStatus = 'loading'
    activityData.value.error =''
    try{
      const res = await activityResponse({filterStatus,currentPage})

      activityData.value.list = res.list
      activityData.value.pageInfo = {
        currentPage: res.pageInfo.currentPage,
        pageSize: res.pageInfo.pageSize,
        totalPages: res.pageInfo.totalPages,
      }

      activityData.value.loadingStatus = 'success'

    }catch{
      activityData.value.loadingStatus = 'error'
      activityData.value.error = '資料讀取失敗，請洽工作人員'
    }
  }

  /**
   * setFilter - 設置篩選狀態
   */
  const setFilter=(status: Status)=>{
    activityData.value.filters = status
    activityData.value.pageInfo.currentPage = 1
    activityData.value.list = []
    const params = {filterStatus:activityData.value.filters, currentPage:activityData.value.pageInfo.currentPage}
    fetchActivities(params)
  }
  return {
    activityData,
    fetchActivities,
  }
})
