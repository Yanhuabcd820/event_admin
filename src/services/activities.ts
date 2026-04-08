import { supabase } from './supabaseClient'
import type { Status, FilterStatus } from '@/types/activity'

type ApiResponse<T> =
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string }

export type Activity = {
  id: string
  title: string
  status: Status
  startAt: string
  dueAt: string
  createdAt: string
  updatedAt: string
  isUpdating: boolean
}

export type ActivitiesResponse = ApiResponse<{
  list: Activity[]
  pageInfo: {
    currentPage: number
    pageSize: number
    totalCount: number
  }
}>

export const apiFetchActivitiesResponse = async ({
  filterStatus,
  currentPage,
}: {
  filterStatus: FilterStatus
  currentPage: number
}): Promise<ActivitiesResponse> => {
  const pageSize = 10
  let query = supabase
    .from('activities')
    .select('*', { count: 'exact' })
    .order('createdAt', { ascending: false })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

  if (filterStatus && filterStatus !== 'all') {
    query = query.eq('status', filterStatus)
  }

  const { data, error, count } = await query

  if (error) {
    return { status: 'error', data: null, error: error.message }
  }

  return {
    status: 'success',
    data: {
      list: data as Activity[],
      pageInfo: {
        currentPage,
        pageSize,
        totalCount: count ?? 0,
      },
    },
    error: null,
  }
}

/**該筆活動資料 */
export type FormModel = {
  title: string
  status: Status
  startAt: string
  dueAt: string
}

export type ActivityResponse = ApiResponse<FormModel>

export const apiFetchActivityByIdResponse = async (id: string): Promise<ActivityResponse> => {
  
  let query = supabase
  .from('activities')
  .select('*')
  .eq('id', id)
  .single()

  const { data, error } = await query
  if (error) {
    return { status: 'error', data: null, error: error.message }
  }
  return {
    status: 'success',
    data,
    error: null,
  }
  
}

type UpsertActivity = {
  title: string
  status: Status
  startAt: string
  dueAt: string
}

export const apiCreateActivityResponse = async ({
  payload,
}: {
  payload: UpsertActivity
}): Promise<ActivityResponse> => {

const { data, error } = await supabase
  .from('activities')
  .insert([payload])
  .select()
  .single()

  if (error) {
    return { status: 'error', data: null, error: error.message }
  }
  return {
    status: 'success',
    data,
    error: null,
  }
}

export const apiUpdateActivityResponse = async ({
  id,
  payload,
}: {
  id: string
  payload: UpsertActivity
}): Promise<ActivityResponse> => {

  const { data, error } = await supabase
  .from('activities')
  .update([payload])
  .eq('id', id)
  .select()
  .single()
  
  if (error) {
    return { status: 'error', data: null, error: error.message }
  }

  return {
    status: 'success',
    data,
    error: null,
  }

}

export const apiUpdateStatus = async ({
  id,
  status,
}: {
  id: string
  status: Status
}): Promise<ActivityResponse> => {

  const { data, error } = await supabase
  .from('activities')
  .update({status})
  .eq('id', id)
  .select()
  .single()

  if (error) {
    return { status: 'error', data: null, error: error.message }
  }
  return {
    status: 'success',
    data,
    error: null,
  }
  
}
