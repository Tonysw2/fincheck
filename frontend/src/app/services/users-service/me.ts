import { GenericAbortSignal } from 'axios'

import { httpClient } from '../http-client'

interface MeParams {
  signal?: GenericAbortSignal
}

interface MeResponse {
  user: {
    name: string
    email: string
  }
}

export async function me(params?: MeParams) {
  const response = await httpClient.get<MeResponse>('/users/me', {
    signal: params?.signal,
  })

  return response.data
}
