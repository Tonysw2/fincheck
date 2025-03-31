import { Controller } from 'react-hook-form'

import { Button } from '../../../../components/button'
import { ColorsDropdownInput } from '../../../../components/colors-dropdown-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useNewAccountModalController } from './use-new-account-modal-controller'

export function NewAccountModal() {
  const {
    form,
    isCreatingBankAccount,
    isNewAccountModalOpen,
    onSubmit,
    closeNewAccountModal,
  } = useNewAccountModalController()

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
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
          isLoading={isCreatingBankAccount}
          className="mt-6 w-full"
        >
          Criar
        </Button>
      </form>
    </Modal>
  )
}
