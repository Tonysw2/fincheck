import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useCreateBankAccountHookForm } from '../../../../../app/hooks/use-create-bank-account-hook-form'
import { bankAccountServices } from '../../../../../app/services/bank-account-service'
import { useDashboard } from '../../components/dashboard-context'

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const form = useCreateBankAccountHookForm()

  const { isPending: isCreatingBankAccount, mutateAsync: createBankAccountFn } =
    useMutation({
      mutationFn: bankAccountServices.create,
    })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createBankAccountFn({
        name: data.name,
        color: data.color,
        type: data.type,
        initialBalance: parseFloat(data.initialBalance),
      })

      form.reset()

      toast.success('Conta cadastrada com sucesso!')

      closeNewAccountModal()
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
