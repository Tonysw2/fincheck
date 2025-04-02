import { GenericAbortSignal } from 'axios'

import { User } from '../../entities/user'
import { httpClient } from '../http-client'

interface MeParams {
  signal?: GenericAbortSignal
}

interface MeResponse {
  user: User
}

export async function me(params?: MeParams) {
  const response = await httpClient.get<MeResponse>('/users/me', {
    signal: params?.signal,
  })

  return response.data
}
