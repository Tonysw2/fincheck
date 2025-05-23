import { Controller } from 'react-hook-form'

import { Button } from '../../../../components/button'
import { ColorsDropdownInput } from '../../../../components/colors-dropdown-input'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { ConfirmDeleteModal } from '../confirm-delete-modal'
import { useUpdateAccountModalController } from './use-update-account-modal-controller'

export function UpdateAccountModal() {
  const {
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
  } = useUpdateAccountModalController()

  if (isDeleteAccountModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteAccount}
        isLoading={isDeletingBankAccount}
        onClose={closeDeleteAccountModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    )
  }

  return (
    <Modal
      title="Editar Conta"
      open={isUpdateBankAccountModalOpen}
      onClose={closeUpdateBankAccountModal}
      rightAction={
        <button type="button" onClick={openDeleteAccountModal}>
          <TrashIcon className="size-6 text-red-900" />
        </button>
      }
    >
      <form className="mt-10" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <Controller
              name="initialBalance"
              control={form.control}
              render={({ field, formState }) => (
                <InputCurrency
                  {...field}
                  error={formState.errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={form.formState.errors.name?.message}
            {...form.register('name')}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.type?.message}
                placeholder="Tipo"
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente',
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos',
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro',
                  },
                ]}
              />
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field }) => (
              <ColorsDropdownInput
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.color?.message}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          isLoading={isUpdatingBankAccount}
          disabled={!form.formState.isDirty}
          className="mt-6 w-full"
        >
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
