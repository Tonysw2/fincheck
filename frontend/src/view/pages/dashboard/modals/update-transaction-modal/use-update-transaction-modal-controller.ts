import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Transaction } from '../../../../../app/entities/transaction'
import { useDeleteTransactionMutation } from '../../../../../app/hooks/use-delete-transaction-mutation'
import { useGetAllBankAccountsQuery } from '../../../../../app/hooks/use-get-all-bank-accounts-query'
import { useGetAllCategoriesQuery } from '../../../../../app/hooks/use-get-all-categories-query'
import { useUpdateTransactionHookForm } from '../../../../../app/hooks/use-update-transaction-hook-form'
import { useUpdateTransactionMutation } from '../../../../../app/hooks/use-update-transaction-mutation'

interface UseUpdateTransactionModalControllerParams {
  transaction: Transaction
  onCloseUpdateModal: () => void
}

export function useUpdateTransactionModalController({
  transaction,
  onCloseUpdateModal,
}: UseUpdateTransactionModalControllerParams) {
  const isIncome = transaction.type === 'INCOME'

  const [isDeleteTransactionModalOpen, setIsDeleteTransactionModalOpen] =
    useState(false)

  const { bankAccounts, isBankAccountsFetching } = useGetAllBankAccountsQuery()
  const { categories: categoriesList, isCategoriesFetching } =
    useGetAllCategoriesQuery()

  const categories = useMemo(() => {
    return categoriesList.filter((item) => item.type === transaction.type)
  }, [categoriesList, transaction])

  const form = useUpdateTransactionHookForm(transaction)

  const { isDeletingTransaction, deleteTransactionFn } =
    useDeleteTransactionMutation()
  const { isUpdatingTransaction, updateTransactionFn } =
    useUpdateTransactionMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateTransactionFn({
        data: {
          id: transaction.id,
          name: data.name,
          date: data.date.toISOString(),
          bankAccountId: data.bankAccountId,
          transactionCategoryId: data.categoryId,
          type: transaction.type,
          value: parseFloat(data.value),
        },
      })
      toast.success('Transação atualizada com sucesso!')
      onCloseUpdateModal()
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao atualizar sua transação.')
    }
  })

  async function handleDeleteTransaction() {
    try {
      await deleteTransactionFn(transaction.id)
      toast.success(`${isIncome ? 'Receita' : 'Despesa'} excluída com sucesso!`)
      onCloseUpdateModal()
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao excluir sua transação.')
    }
  }

  function openDeleteTransactionModal() {
    setIsDeleteTransactionModalOpen(true)
  }

  function closeDeleteTransactionModal() {
    setIsDeleteTransactionModalOpen(false)
  }

  return {
    form,
    isIncome,
    categories,
    bankAccounts,
    isCategoriesFetching,
    isBankAccountsFetching,
    isUpdatingTransaction,
    isDeleteTransactionModalOpen,
    isDeletingTransaction,
    onSubmit,
    deleteTransactionFn,
    handleDeleteTransaction,
    openDeleteTransactionModal,
    closeDeleteTransactionModal,
  }
}
