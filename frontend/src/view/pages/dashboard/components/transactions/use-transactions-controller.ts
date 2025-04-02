import { useEffect, useState } from 'react'

import { Transaction } from '../../../../../app/entities/transaction'
import { useGetAllTransactionsQuery } from '../../../../../app/hooks/use-get-all-transactions-query'
import { TransactionsFilters } from '../../../../../app/services/transactions-service/get-all'

export function useTransactionsController() {
  const [isTransactionsFiltersModalOpen, setIsTransactionsFiltersModalOpen] =
    useState(false)
  const [isUpdateTransactionModalOpen, setIsUpdateTransactionModalOpen] =
    useState(false)
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<Transaction | null>(null)

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

  function handleOpenUpdateTransactionModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction)
    setIsUpdateTransactionModalOpen(true)
  }

  function handleCloseUpdateTransactionModal() {
    setTransactionBeingEdited(null)
    setIsUpdateTransactionModalOpen(false)
  }

  return {
    transactions,
    hasTransactions,
    transactionsFilters,
    isTransactionsLoading,
    isTransactionsFetching,
    transactionBeingEdited,
    isTransactionsFiltersModalOpen,
    isUpdateTransactionModalOpen,
    handleApplyFilters,
    handleFiltersChange,
    handleOpenTransactionsFiltersModal,
    handleCloseTransactionsFiltersModal,
    handleOpenUpdateTransactionModal,
    handleCloseUpdateTransactionModal,
  }
}
