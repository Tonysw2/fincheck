import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bankAccountServices } from '../services/bank-account-service'
import { GET_ALL_BANK_ACCOUNTS_QUERY_KEY } from './use-get-all-bank-accounts-query'

export function useUpdateBankAccountMutation() {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_BANK_ACCOUNTS_QUERY_KEY,
      })
    },
  })

  return {
    isUpdatingBankAccount: isPending,
    updateBankAccountFn: mutateAsync,
  }
}
