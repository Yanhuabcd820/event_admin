import axios from "axios"

export type FormLogin = {
  username: string
  password: string
}
export type AuthResponse =
  | {
      status: 'success'
      data: {
        token: string
      }
      error: null
    }
  | {
      status: 'error'
      data: null
      error: string
    }
  | null
type VerifyTokenResponse =
  | {
      status: 'success'
      data: {
        valid: boolean
      }
      error: null
    }
  | {
      status: 'error'
      data: null
      error: string 
    }
  | null
export const apiFetchAuthResponse = async (loginData: object
): Promise<AuthResponse> => {
  const { username, password } = loginData as FormLogin
  return {
    status: 'success',
    data: {
      token: 'sffe323#$@sdfet*^&%$#@!sdf',
    },
    error: null,
  }
}
export const apiVerifyToken = async(token: string|null):Promise<VerifyTokenResponse>=>{
  return {
    status: 'success',
    data: {
      valid: true,
    },
    error: null,
  }
}