import { Transaction } from '../../entities/transaction'
import { httpClient } from '../http-client'

interface UpdateTransactionParams {
  data: Omit<Transaction, 'transactionCategory'>
}

export async function update({ data }: UpdateTransactionParams) {
  const { id, bankAccountId, transactionCategoryId, name, value, date, type } =
    data

  const response = await httpClient.put(`/transactions/${id}`, {
    bankAccountId,
    transactionCategoryId,
    name,
    value,
    date,
    type,
  })

  return response.data
}
