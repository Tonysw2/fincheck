import { Transaction } from '../../entities/transaction'
import { httpClient } from '../http-client'

export type TransactionsFilters = {
  month: number
  year: number
  bankAccountId?: string
  type?: Transaction['type']
}

interface GetAllTransactionsParams {
  query: TransactionsFilters
  signal?: AbortSignal
}

type GetAllTransactionsResponse = Transaction[]

export async function getAll(params: GetAllTransactionsParams) {
  const { query, signal } = params
  const { month, year, bankAccountId, type } = query

  const response = await httpClient.get<GetAllTransactionsResponse>(
    '/transactions',
    {
      params: {
        month,
        year,
        bankAccountId,
        type,
      },
      signal,
    },
  )

  return response.data
}
