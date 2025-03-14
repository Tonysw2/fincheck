import { httpClient } from '../http-client'

export interface SignUpParams {
  name: string
  email: string
  password: string
}

export interface SignUpResponse {
  accessToken: string
}

export async function signUp({ name, email, password }: SignUpParams) {
  const response = await httpClient.post<SignUpResponse>('/auth/sign-up', {
    name,
    email,
    password,
  })

  return response.data
}
