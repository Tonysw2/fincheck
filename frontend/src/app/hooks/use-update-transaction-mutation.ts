import { useMutation, useQueryClient } from '@tanstack/react-query'

import { transactionsService } from '../services/transactions-service'
import { GET_ALL_TRANSACTIONS_QUERY_KEY } from './use-get-all-transactions-query'

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_TRANSACTIONS_QUERY_KEY,
      })
    },
  })

  return {
    isUpdatingTransaction: isPending,
    updateTransactionFn: mutateAsync,
  }
}
