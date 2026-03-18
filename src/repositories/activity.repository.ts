import {
  apiFetchActivitiesResponse,
  apiFetchActivityByIdResponse,
  apiCreateActivityResponse,
  apiUpdateActivityResponse,
  apiUpdateStatus,
} from '@/services/index'
import type { FilterStatus, Status } from '@/types/activity'
import type { ActivitiesResponse, ActivityResponse, FormModel } from '@/services/index'

export const getActivities = async (params: {
  filterStatus: FilterStatus
  currentPage: number
}): Promise<ActivitiesResponse> => {
  // 可作為資料轉換使用
  return apiFetchActivitiesResponse(params)
}

export const getActivityById = async (id: string): Promise<ActivityResponse> => {
  return apiFetchActivityByIdResponse(id)
}

export const createTheActivity = async (payload: FormModel): Promise<ActivityResponse> => {
  return apiCreateActivityResponse({ payload })
}

export const updateTheActivity = async ({
  id,
  payload,
}: {
  id: string
  payload: FormModel
}): Promise<ActivityResponse> => {
  return apiUpdateActivityResponse({ id, payload })
}

export const updateActivityStatus = async ({
  id,
  status,
}: {
  id: string
  status: Status
}): Promise<ActivityResponse> => {
  return apiUpdateStatus({ id, status })
}
