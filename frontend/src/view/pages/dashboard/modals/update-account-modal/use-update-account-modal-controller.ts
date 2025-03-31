import { useState } from 'react'
import toast from 'react-hot-toast'

import { useDeleteBankAccountMutation } from '../../../../../app/hooks/use-delete-bank-account-mutation'
import { useUpdateBankAccountHookForm } from '../../../../../app/hooks/use-update-bank-account-hook-form'
import { useUpdateBankAccountMutation } from '../../../../../app/hooks/use-update-bank-account-mutation'
import { useDashboard } from '../../components/dashboard-context'

export function useUpdateAccountModalController() {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false)

  const {
    bankAccountBeingUpdated,
    isUpdateBankAccountModalOpen,
    closeUpdateBankAccountModal,
  } = useDashboard()

  const form = useUpdateBankAccountHookForm()

  const { isUpdatingBankAccount, updateBankAccountFn } =
    useUpdateBankAccountMutation()

  const { isDeletingBankAccount, deleteBankAccountFn } =
    useDeleteBankAccountMutation()

  function openDeleteAccountModal() {
    setIsDeleteAccountModalOpen(true)
  }

  function closeDeleteAccountModal() {
    setIsDeleteAccountModalOpen(false)
  }

  async function handleDeleteAccount() {
    try {
      await deleteBankAccountFn(bankAccountBeingUpdated!.id)

      toast.success('Conta deletada com sucesso!')

      closeUpdateBankAccountModal()
    } catch (error) {
      console.log(error)
      toast.error('Erro ao deletar conta.')
    }
  }

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateBankAccountFn({
        data: {
          id: data.id,
          name: data.name,
          color: data.color,
          type: data.type,
          initialBalance: parseFloat(data.initialBalance),
        },
      })

      toast.success('Conta atualizada com sucesso!')
      closeUpdateBankAccountModal()
    } catch (error) {
      console.log(error)
      toast.error('Erro ao atualizar conta.')
    }
  })

  return {
    form,
    isDeletingBankAccount,
    isUpdatingBankAccount,
    isDeleteAccountModalOpen,
    isUpdateBankAccountModalOpen,
    onSubmit,
    handleDeleteAccount,
    openDeleteAccountModal,
    closeDeleteAccountModal,
    closeUpdateBankAccountModal,
  }
}
