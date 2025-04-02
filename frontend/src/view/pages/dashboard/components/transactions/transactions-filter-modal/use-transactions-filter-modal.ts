import { useState } from 'react'

import { useGetAllBankAccountsQuery } from '../../../../../../app/hooks/use-get-all-bank-accounts-query'

export function useTransactionsFilterModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | undefined
  >(undefined)

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { bankAccounts } = useGetAllBankAccountsQuery()

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((state) =>
      state === bankAccountId ? undefined : bankAccountId,
    )
  }

  function handleChangeYear(step: number) {
    setSelectedYear((state) => state + step)
  }

  return {
    bankAccounts,
    selectedYear,
    selectedBankAccountId,
    handleChangeYear,
    handleSelectBankAccount,
  }
}
