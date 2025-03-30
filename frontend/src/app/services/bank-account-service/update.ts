import { BankAccount } from '../../entities/bank-account'
import { httpClient } from '../http-client'

type UpdateBankAccountParams = {
  data: Omit<BankAccount, 'currentBalance'>
}

export async function update({ data }: UpdateBankAccountParams) {
  const { id, name, color, type, initialBalance } = data

  const response = await httpClient.put(`/bank-accounts/${id}`, {
    name,
    color,
    type,
    initialBalance,
  })

  return response.data
}
