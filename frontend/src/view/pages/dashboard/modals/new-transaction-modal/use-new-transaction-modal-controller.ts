import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { useCreateNewTransactionHookForm } from '../../../../../app/hooks/use-create-new-transaction-hook-form'
import { useCreateNewTransactionMutation } from '../../../../../app/hooks/use-create-new-transaction-mutation'
import { useGetAllBankAccountsQuery } from '../../../../../app/hooks/use-get-all-bank-accounts-query'
import { useGetAllCategoriesQuery } from '../../../../../app/hooks/use-get-all-categories-query'
import { useDashboard } from '../../components/dashboard-context'

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard()

  const form = useCreateNewTransactionHookForm()

  const { bankAccounts, isBankAccountsFetching } = useGetAllBankAccountsQuery()
  const { categories: categoriesList, isCategoriesFetching } =
    useGetAllCategoriesQuery()

  const categories = useMemo(() => {
    return categoriesList.filter((item) => item.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  const { isCreatingTransaction, createTransactionFn } =
    useCreateNewTransactionMutation()

  function handleCloseNewTransactionModal() {
    closeNewTransactionModal()
    form.reset()
  }

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createTransactionFn({
        data: {
          bankAccountId: data.bankAccountId,
          categoryId: data.categoryId,
          name: data.name,
          value: parseFloat(data.value),
          date: data.date.toISOString(),
          type: newTransactionType!,
        },
      })

      toast.success(
        newTransactionType === 'INCOME'
          ? 'Receita cadastrada com sucesso!'
          : 'Despesa cadastrada com sucesso!',
      )
      closeNewTransactionModal()
      form.reset()
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao criar a transação.')
    }
  })

  const isIncome = newTransactionType === 'INCOME'

  return {
    form,
    isIncome,
    categories,
    bankAccounts,
    isCategoriesFetching,
    isCreatingTransaction,
    isBankAccountsFetching,
    isNewTransactionModalOpen,
    onSubmit,
    handleCloseNewTransactionModal,
  }
}
