import { httpClient } from '../http-client'

export async function deleteTransaction(id: string) {
  await httpClient.delete(`/transactions/${id}`)
}
