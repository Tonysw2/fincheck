import { useState } from 'react'

import { useDashboard } from '../dashboard-context'

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard()

  const [isTransactionsFiltersModalOpen, setIsTransactionsFiltersModalOpen] =
    useState(true)

  function handleOpenTransactionsFiltersModal() {
    setIsTransactionsFiltersModalOpen(true)
  }

  function handleCloseTransactionsFiltersModal() {
    setIsTransactionsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    isPending: false,
    isFetching: true,
    transactions: [],
    isTransactionsFiltersModalOpen,
    handleOpenTransactionsFiltersModal,
    handleCloseTransactionsFiltersModal,
  }
}
