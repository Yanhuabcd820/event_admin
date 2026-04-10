import {
  apiFetchActivitiesResponse,
  apiFetchActivityByIdResponse,
  apiCreateActivityResponse,
  apiUpdateActivityResponse,
  apiUpdateStatus,
} from '@/services/activities'
import type { FilterStatus, Status } from '@/types/activity'
import type { ActivitiesResponse, ActivityResponse, FormModel, Activity } from '@/services/activities'

export const getActivities = async (params: {
  filterStatus: FilterStatus
  currentPage: number
}): Promise<ActivitiesResponse> => {
  const res = await apiFetchActivitiesResponse(params)
  if (res.status === 'success' && res.data) {
    res.data.list = res.data.list.map(item => ({
      ...item,
      createdAt: item.createdAt
        ? new Date(item.createdAt).toISOString().split('T')[0]
        : '',
      updatedAt: item.updatedAt
        ? new Date(item.updatedAt).toISOString().split('T')[0]
        : '',
    })) as Activity[]
  }
  return res
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
