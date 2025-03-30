import toast from 'react-hot-toast'

import { useUpdateBankAccountHookForm } from '../../../../../app/hooks/use-update-bank-account-hook-form'
import { useUpdateBankAccountMutation } from '../../../../../app/hooks/use-update-bank-account-mutation'
import { useDashboard } from '../../components/dashboard-context'

export function useUpdateAccountModalController() {
  const { isUpdateBankAccountModalOpen, closeUpdateBankAccountModal } =
    useDashboard()

  const form = useUpdateBankAccountHookForm()

  const { isUpdatingBankAccount, updateBankAccountFn } =
    useUpdateBankAccountMutation()

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
    isUpdatingBankAccount,
    isUpdateBankAccountModalOpen,
    onSubmit,
    closeUpdateBankAccountModal,
  }
}
