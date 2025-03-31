import { useMutation, useQueryClient } from '@tanstack/react-query'

import { bankAccountServices } from '../services/bank-account-service'
import { GET_ALL_BANK_ACCOUNTS_QUERY_KEY } from './use-get-all-bank-accounts-query'

export function useDeleteBankAccountMutation() {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountServices.deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_BANK_ACCOUNTS_QUERY_KEY,
      })
    },
  })

  return {
    isDeletingBankAccount: isPending,
    deleteBankAccountFn: mutateAsync,
  }
}
