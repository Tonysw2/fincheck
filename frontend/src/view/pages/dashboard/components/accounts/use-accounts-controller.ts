import { useDashboard } from '../dashboard-context'

export function useAccountsController() {
  const { areValuesVisible, toggleValuesVisibility } = useDashboard()

  return {
    accounts: [],
    isLoading: false,
    areValuesVisible,
    toggleValuesVisibility,
  }
}
