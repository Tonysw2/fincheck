import { useDashboard } from '../dashboard-context'

export function useAccountsController() {
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard()

  return {
    accounts: [],
    isLoading: false,
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
  }
}
