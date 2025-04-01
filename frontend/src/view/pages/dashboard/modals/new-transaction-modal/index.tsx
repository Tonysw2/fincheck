import { Controller } from 'react-hook-form'

import { Button } from '../../../../components/button'
import { DatePickerInput } from '../../../../components/date-picker-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useNewTransactionModalController } from './use-new-transaction-modal-controller'

export function NewTransactionModal() {
  const {
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
  } = useNewTransactionModalController()

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={handleCloseNewTransactionModal}
    >
      <form className="mt-10" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600">
            Valor {isIncome ? 'da receita' : 'da despesa'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <Controller
              control={form.control}
              name="value"
              render={({ field }) => (
                <InputCurrency
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
            error={form.formState.errors.name?.message}
            {...form.register('name')}
          />

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Select
                placeholder="Categoria"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                isLoading={isCategoriesFetching}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            name="bankAccountId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Select
                placeholder={isIncome ? 'Receber com' : 'Pagar com'}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                isLoading={isBankAccountsFetching}
                options={bankAccounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <DatePickerInput
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          isLoading={isCreatingTransaction}
          className="mt-6 w-full"
        >
          Criar
        </Button>
      </form>
    </Modal>
  )
}
