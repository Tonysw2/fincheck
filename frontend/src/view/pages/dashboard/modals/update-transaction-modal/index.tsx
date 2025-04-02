import { Controller } from 'react-hook-form'

import { Transaction } from '../../../../../app/entities/transaction'
import { Button } from '../../../../components/button'
import { DatePickerInput } from '../../../../components/date-picker-input'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { ConfirmDeleteModal } from '../confirm-delete-modal'
import { useUpdateTransactionModalController } from './use-update-transaction-modal-controller'

interface UpdateTransactionModalProps {
  open: boolean
  transaction: Transaction
  onClose: () => void
}

export function UpdateTransactionModal({
  open,
  transaction,
  onClose,
}: UpdateTransactionModalProps) {
  const {
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
    handleDeleteTransaction,
    openDeleteTransactionModal,
    closeDeleteTransactionModal,
  } = useUpdateTransactionModalController({
    transaction,
    onCloseUpdateModal: onClose,
  })

  if (isDeleteTransactionModalOpen) {
    return (
      <ConfirmDeleteModal
        title={`Tem certeza que deseja deletar essa ${isIncome ? 'receita' : 'despesa'}?`}
        onClose={closeDeleteTransactionModal}
        onConfirm={handleDeleteTransaction}
        isLoading={isDeletingTransaction}
      />
    )
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Editar ${isIncome ? 'Receita' : 'Despesa'}`}
      rightAction={
        <button type="button" onClick={openDeleteTransactionModal}>
          <TrashIcon className="size-6 text-red-900" />
        </button>
      }
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
          className="mt-6 w-full"
          isLoading={isUpdatingTransaction}
          disabled={!form.formState.isDirty}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
