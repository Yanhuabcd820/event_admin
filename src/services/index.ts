import axios from "axios"
import type {Status,FilterStatus} from '@/types/activity'

export type Activity = {
  title: string,
  id:string,
  status:Status,
  createdAt:string,
  updatedAt:string,
  startAt:string,
  dueAt:string,
  isUpdating:boolean
}
type ActivitiesResponse = {
  list:Activity[],
  pageInfo:{
    currentPage: number,
    pageSize: number,
    totalCount:number
  }
}

export const apiFetchActivitiesResponse = async({filterStatus,currentPage}: {filterStatus: FilterStatus, currentPage: number}):Promise<ActivitiesResponse>=>{
  return{
      list:[
        {
          title: '秋遊會',
          id:'1',
          status:'online',
          createdAt: '2026-01-07',
          updatedAt:'2026-01-17',
          startAt:'2026-02-27',
          dueAt:'2026-03-05',
          isUpdating: false
        },
        {
          title: '2026馬到成功春酒會',
          id:'2',
          status:'offlineManual',
          createdAt: '2026-02-07',
          updatedAt:'2026-02-17',
          startAt:'2026-03-27',
          dueAt:'2026-05-05',
          isUpdating: false
        },
        {
          title: '馬到成功',
          id:'3',
          status:'offlineExpired',
          createdAt: '2025-11-07',
          updatedAt:'2025-12-17',
          startAt:'2026-01-27',
          dueAt:'2026-05-05',
          isUpdating: false
        },
        {
          title: '馬到成功',
          id:'4',
          status:'draft',
          createdAt: '2025-01-07',
          updatedAt:'2025-02-17',
          startAt:'2025-11-27',
          dueAt:'2025-12-05',
          isUpdating: false
        },
        {
          title: '2025馬到成功',
          id:'5',
          status:'draft',
          createdAt: '2025-01-07',
          updatedAt:'2025-02-17',
          startAt:'2025-11-27',
          dueAt:'2025-12-05',
          isUpdating: false
        },
      ],
      pageInfo:{
        currentPage: 2,
        pageSize: 10,
        totalCount:18
      }
    }
}



/**該筆活動資料 */
export type CurrentActivity = {
  title: string
  id: string
  status: Status
  createdAt: string
  updatedAt: string
  startAt: string
  dueAt: string
}
export type CurrentActivityResponse = CurrentActivity

export const apiFetchActivityByIdResponse = async (id: string): Promise<CurrentActivityResponse> => {
  return {
    title: '秋遊會',
    id: '1',
    status: 'online',
    createdAt: '2026-01-07',
    updatedAt: '2026-01-17',
    startAt: '2026-02-27',
    dueAt: '2026-03-05',
  }
}


type UpdateActivity = {
  title: string
  status: Status
  startAt: string
  dueAt: string
 } | null

export type UpdateActivityResponse = {
  status: string
  data: CurrentActivity | null
  error: any
}
export const apiUpdateActivityResponse = async ({ id, payload }: { id: string; payload: UpdateActivity }): Promise<UpdateActivityResponse> => {
  return {
    status:"success",
    data: {
      title: '秋遊會',
      id: '1',
      status: 'online',
      createdAt: '2026-01-07',
      updatedAt: '2026-01-17',
      startAt: '2026-02-27',
      dueAt: '2026-03-05',
    },
    error: null
  }
}

