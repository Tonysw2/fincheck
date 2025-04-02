import { useEffect, useState } from 'react'

import { useGetAllTransactionsQuery } from '../../../../../app/hooks/use-get-all-transactions-query'
import { TransactionsFilters } from '../../../../../app/services/transactions-service/get-all'

export function useTransactionsController() {
  const [isTransactionsFiltersModalOpen, setIsTransactionsFiltersModalOpen] =
    useState(false)

  const [transactionsFilters, setTransactionsFilters] =
    useState<TransactionsFilters>({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    })

  const {
    transactions,
    isTransactionsLoading,
    isTransactionsFetching,
    refetchTransactions,
  } = useGetAllTransactionsQuery(transactionsFilters)

  useEffect(() => {
    refetchTransactions()
  }, [transactionsFilters])

  const hasTransactions = transactions.length > 0

  function handleFiltersChange(newFilters: Partial<TransactionsFilters>) {
    setTransactionsFilters((filters) => ({
      ...filters,
      ...newFilters,
    }))
  }

  function handleApplyFilters({
    year,
    bankAccountId,
  }: {
    year: number
    bankAccountId?: string
  }) {
    handleFiltersChange({ year, bankAccountId })
    handleCloseTransactionsFiltersModal()
  }

  function handleOpenTransactionsFiltersModal() {
    setIsTransactionsFiltersModalOpen(true)
  }

  function handleCloseTransactionsFiltersModal() {
    setIsTransactionsFiltersModalOpen(false)
  }

  return {
    transactions,
    hasTransactions,
    transactionsFilters,
    isTransactionsLoading,
    isTransactionsFetching,
    isTransactionsFiltersModalOpen,
    handleApplyFilters,
    handleFiltersChange,
    handleOpenTransactionsFiltersModal,
    handleCloseTransactionsFiltersModal,
  }
}
