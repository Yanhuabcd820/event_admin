import { supabase } from './supabaseClient'

export type FormLogin = {
  mail: string
  password: string
}

export type AuthResponse =
  | {
      status: 'success'
      data: {
        user: string
      }
    error: null
    }
  | {
      status: 'error'
      data: null
      error: string
    }
  | null

export const loginAuth = async (loginData: FormLogin): Promise<AuthResponse> => {
  const { mail, password } = loginData
  const res = await signIn(mail, password)
  
  if (res?.status === 'success') {
    return {
      status: 'success',
      data: {
        user: res.user?.email ?? '',
      },
      error: null,
    }
  } else {
    return {
      status: 'error',
      data: null,
      error: res.error ?? '',
    }
  }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { status: 'error', error: error.message }
  }
  return { status: 'success', user: data.user }
}

export const signOutAuth = async () => {
  const { error } = await supabase.auth.signOut()
  
  return { error }
}
