import { httpClient } from '../http-client'

export async function deleteAccount(id: string) {
  await httpClient.delete(`/bank-accounts/${id}`)
}
