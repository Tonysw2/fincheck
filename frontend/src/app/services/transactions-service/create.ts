import { httpClient } from '../http-client'

interface CreateNewTransactionParams {
  data: {
    bankAccountId: string
    categoryId: string
    name: string
    value: number
    date: string
    type: 'INCOME' | 'EXPENSE'
  }
}

export async function create({ data }: CreateNewTransactionParams) {
  const { bankAccountId, categoryId, name, value, date, type } = data

  const response = await httpClient.post('/transactions', {
    bankAccountId,
    categoryId,
    name,
    value,
    date,
    type,
  })

  return response.data
}
