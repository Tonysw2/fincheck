import { httpClient } from '../http-client'

export interface SignInParams {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function signIn({ email, password }: SignInParams) {
  const response = await httpClient.post<SignInResponse>('/auth/sign-in', {
    email,
    password,
  })

  return response.data
}
