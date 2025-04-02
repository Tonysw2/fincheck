import { useMutation, useQueryClient } from '@tanstack/react-query'

import { transactionsService } from '../services/transactions-service'
import { GET_ALL_BANK_ACCOUNTS_QUERY_KEY } from './use-get-all-bank-accounts-query'
import { GET_ALL_TRANSACTIONS_QUERY_KEY } from './use-get-all-transactions-query'

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_TRANSACTIONS_QUERY_KEY,
      })
      queryClient.invalidateQueries({
        queryKey: GET_ALL_BANK_ACCOUNTS_QUERY_KEY,
      })
    },
  })

  return {
    isDeletingTransaction: isPending,
    deleteTransactionFn: mutateAsync,
  }
}
