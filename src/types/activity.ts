/**
 * AuthStatus - 認證狀態
 * authenticated: 已認證
 * unauthenticated: 未認證
 * pending: 認證中
 */
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'pending'

/**
 * Status - 活動狀態
 * online: 活動上線中
 * offlineManual: 活動已下架
 * offlineExpired: 活動時間到期自動下架
 * draft: 活動草稿
 */
export type Status = 'online' | 'offlineManual' | 'offlineExpired' | 'draft'

/**
 * FilterStatus - 活動篩選狀態
 * all: 所有活動
 */
export type FilterStatus = Status | 'all'

/**
 * LoadingStatus - 加載狀態
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error'
