import { create } from './create'
import { deleteTransaction } from './delete'
import { getAll } from './get-all'
import { update } from './update'

export const transactionsService = {
  getAll,
  create,
  update,
  deleteTransaction,
}
