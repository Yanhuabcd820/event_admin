import { defineStore } from 'pinia'
import { ref,readonly } from 'vue'
import {apiFetchActivitiesResponse,apiUpdateStatus} from '@/services/index.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import type {Status, FilterStatus, LoadingStatus } from '@/types/activity'
import type { Activity } from '@/services/index.ts'

// 狀態按鈕
type StatusDetail = {
  name: string
  filterName: FilterStatus
}


type ActivityData = {
  loadingStatus:LoadingStatus,
  list:Activity[],
  pageInfo:{
    currentPage: number,
    pageSize: number,
    totalCount:number
  },
  filters: FilterStatus, 
  error:string|null
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

  // 篩選狀態按鈕
  const filterButtons:StatusDetail[]=[  
    {
      name: '全部活動',
      filterName: 'all'
    },
    ...formStatusOptions
  ]
  
  const activityData = ref<ActivityData>({
    loadingStatus: 'idle',
    list: [],
    filters:'all',
    pageInfo:{
      currentPage: 1,
      pageSize: 10,
      totalCount:0
    },
    error: null
  })


  /**
   * fetchActivities - 用於根據當前頁面和篩選狀態從 API 獲取活動數據。
   * idle → loading → success
   * idle → loading → error
   * */
  const fetchActivities = async ({currentPage=1, filterStatus='all'}: { currentPage?: number; filterStatus?: FilterStatus } = {}) => {
    
    if(activityData.value.loadingStatus === 'loading') return

    activityData.value.loadingStatus = 'loading'
    activityData.value.error = null
    try{
      const res = await apiFetchActivitiesResponse({filterStatus,currentPage})

      activityData.value.list = res.list
      activityData.value.pageInfo = {
        currentPage: res.pageInfo.currentPage,
        pageSize: res.pageInfo.pageSize,
        totalCount: res.pageInfo.totalCount,
      }

      activityData.value.loadingStatus = 'success'

    }catch{
      activityData.value.loadingStatus = 'error'
      activityData.value.error = '資料讀取失敗，請洽工作人員'
    }
  }

  /**
   * changeFilter - 設置篩選狀態
   */
  const changeFilter = async(status: FilterStatus)=>{
    activityData.value.filters = status
    activityData.value.pageInfo.currentPage = 1
    activityData.value.list = []
    const params = {filterStatus:activityData.value.filters, currentPage:activityData.value.pageInfo.currentPage}
    await fetchActivities(params)
  }

  const changePage=async(page:number)=>{
    activityData.value.pageInfo.currentPage = page
    activityData.value.list = []
    const params = {filterStatus:activityData.value.filters, currentPage:page}
    await fetchActivities(params)
  }


  const offlineManualConfirm = async({ id, status }: { id: string, status: Status })=>{

    const target = activityData.value.list.find(item => item.id === id) 
    if (!target) return
    const prevTargetStatus = target.status
    
    try{
      await ElMessageBox.confirm(
        '是否確認下架活動?',
        {
          confirmButtonText: '是',
          cancelButtonText: '否',
        }
      )
      target.isUpdating = true
      target.status = status
      const res = await apiUpdateStatus({id,status})
      if(res.status==='success'){
        ElMessage({
          type: 'success',
          message: '活動已下架',
        })
      }else{
        target.status = prevTargetStatus
        ElMessage({
          type: 'error',
          message: '下架失敗，請洽工作人員',
        })
      }
    }catch{
      target.status = prevTargetStatus
      ElMessage({
        type: 'info',
        message: '取消下架',
      })
    }finally{
      target.isUpdating = false
    }
  }



  return {
    statusEnumMap:readonly(statusEnumMap),
    formStatusOptions:readonly(formStatusOptions),
    filterButtons:readonly(filterButtons),
    activityData,
    fetchActivities,
    offlineManualConfirm,
    changeFilter,
    changePage
  }
})
