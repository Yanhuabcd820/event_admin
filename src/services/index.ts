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
export type ActivitiesResponse = 
{
  status: 'success',
  data:{
    list:Activity[],
    pageInfo:{
      currentPage: number,
      pageSize: number,
      totalCount:number
    }
  },
  error: null
} | {
  status: 'error',
  data: null,
  error: string
}

export const apiFetchActivitiesResponse = async({filterStatus,currentPage}: {filterStatus: FilterStatus, currentPage: number}):Promise<ActivitiesResponse>=>{
  return{
    status: 'success',
    data: {
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
    },
    error: null
  }
}



/**該筆活動資料 */
export type FormModel = {
  title: string
  id: string
  status: Status
  createdAt: string
  updatedAt: string
  startAt: string
  dueAt: string
}

export type ActivityResponse = 
 | { status: 'success', data: FormModel, error: null } 
 | { status: 'error', data: null, error: string }

export const apiFetchActivityByIdResponse = async (id: string): Promise<ActivityResponse> => {
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


type UpsertActivity = {
  title: string
  status: Status
  startAt: string
  dueAt: string
 }

export const apiCreateActivityResponse = async ({ payload }: { payload:UpsertActivity }): Promise<ActivityResponse> => {
  return {
    status:"success",
    data: {
      title: '秋遊會 PART II',
      id: '10',
      status: 'online',
      createdAt: '2026-01-07',
      updatedAt: '2026-01-17',
      startAt: '2026-02-27',
      dueAt: '2026-03-05',
    },
    error: null
  }
}

export const apiUpdateActivityResponse = async ({ id, payload }: { id: string; payload: UpsertActivity }): Promise<ActivityResponse> => {
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

export const apiUpdateStatus = async({ id, status }: { id: string; status: Status }): Promise<ActivityResponse>=>{
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
