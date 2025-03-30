import { useMemo } from 'react'

import { useGetAllBankAccountsQuery } from '../../../../../app/hooks/use-get-all-bank-accounts-query'
import { useDashboard } from '../dashboard-context'

export function useAccountsController() {
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard()

  const { bankAccounts, isBankAccountsPending } = useGetAllBankAccountsQuery()

  const currentBalance = useMemo(() => {
    if (bankAccounts.length === 0) return 0

    return bankAccounts.reduce((acc, account) => {
      return acc + account.currentBalance
    }, 0)
  }, [bankAccounts])

  return {
    bankAccounts,
    currentBalance,
    areValuesVisible,
    isBankAccountsPending,
    toggleValuesVisibility,
    openNewAccountModal,
  }
}
