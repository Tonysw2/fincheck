import { useDashboard } from '../dashboard-context'

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()

  return {
    areValuesVisible,
    isPending: false,
    isFetching: true,
    transactions: [],
  }
}
