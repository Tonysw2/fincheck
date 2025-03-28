import { useState } from 'react'

export function useTransactionsFilterModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    string | null
  >(null)

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((state) =>
      state === bankAccountId ? null : bankAccountId,
    )
  }

  function handleChangeYear(step: number) {
    setSelectedYear((state) => state + step)
  }

  return {
    selectedYear,
    selectedBankAccountId,
    handleChangeYear,
    handleSelectBankAccount,
  }
}
