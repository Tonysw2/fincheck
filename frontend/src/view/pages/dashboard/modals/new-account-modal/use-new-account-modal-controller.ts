import toast from 'react-hot-toast'

import { useCreateBankAccountHookForm } from '../../../../../app/hooks/use-create-bank-account-hook-form'
import { UseCreateBankAccountMutation } from '../../../../../app/hooks/use-create-bank-account-mutation'
import { useDashboard } from '../../components/dashboard-context'

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const form = useCreateBankAccountHookForm()

  const { isCreatingBankAccount, createBankAccountFn } =
    UseCreateBankAccountMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createBankAccountFn({
        name: data.name,
        color: data.color,
        type: data.type,
        initialBalance: parseFloat(data.initialBalance),
      })

      toast.success('Conta cadastrada com sucesso!')
      closeNewAccountModal()
      form.reset()
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar a conta.')
    }
  })

  return {
    form,
    isCreatingBankAccount,
    isNewAccountModalOpen,
    onSubmit,
    closeNewAccountModal,
  }
}
