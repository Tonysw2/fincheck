import { useQuery } from '@tanstack/react-query'

import { bankAccountServices } from '../services/bank-account-service'

export const GET_ALL_BANK_ACCOUNTS_QUERY_KEY = ['bank-accounts']

export function useGetAllBankAccountsQuery() {
  const { data, isPending, isFetching } = useQuery({
    staleTime: Infinity,
    queryKey: GET_ALL_BANK_ACCOUNTS_QUERY_KEY,
    queryFn: ({ signal }) => bankAccountServices.getAll(signal),
  })

  return {
    bankAccounts: data ?? [],
    isBankAccountsPending: isPending,
    isBankAccountsFetching: isFetching,
  }
}
