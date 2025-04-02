import { useQuery } from '@tanstack/react-query'

import { transactionsService } from '../services/transactions-service'
import { TransactionsFilters } from '../services/transactions-service/get-all'

export const GET_ALL_TRANSACTIONS_QUERY_KEY = ['transactions']

export function useGetAllTransactionsQuery({
  month,
  year,
  type,
  bankAccountId,
}: TransactionsFilters) {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: GET_ALL_TRANSACTIONS_QUERY_KEY,
    queryFn: ({ signal }) =>
      transactionsService.getAll({
        query: {
          month,
          year,
          type,
          bankAccountId,
        },
        signal,
      }),
  })

  return {
    transactions: data ?? [],
    isTransactionsLoading: isLoading,
    isTransactionsFetching: isFetching,
    refetchTransactions: refetch,
  }
}
