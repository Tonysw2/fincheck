import { httpClient } from '../http-client'

export type GetAllBankAccountsResponse = Array<{
  id: string
  name: string
  color: string
  currentBalance: number
  initialBalance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}>

export async function getAll(signal?: AbortSignal) {
  const response = await httpClient.get<GetAllBankAccountsResponse>(
    '/bank-accounts',
    {
      signal,
    },
  )

  return response.data
}
