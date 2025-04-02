import { Transaction } from '../../entities/transaction'
import { httpClient } from '../http-client'

interface CreateNewTransactionParams {
  data: Omit<Transaction, 'id' | 'transactionCategory'>
}

export async function create({ data }: CreateNewTransactionParams) {
  const { bankAccountId, transactionCategoryId, name, value, date, type } = data

  const response = await httpClient.post('/transactions', {
    bankAccountId,
    transactionCategoryId,
    name,
    value,
    date,
    type,
  })

  return response.data
}
