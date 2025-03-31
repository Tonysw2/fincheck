import { Button } from '../../../../components/button'
import { DatePickerInput } from '../../../../components/date-picker-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useDashboard } from '../../components/dashboard-context'

export function NewTransactionModal() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard()

  const isIncome = newTransactionType === 'INCOME'

  return (
    <Modal
      title={isIncome ? 'Nova Receita' : 'Nova Despesa'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form className="mt-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600">
            Valor {isIncome ? 'da receita' : 'da despesa'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder={isIncome ? 'Nome da receita' : 'Nome da despesa'}
          />

          <Select
            placeholder="Categoria"
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

          <Select
            placeholder={isIncome ? 'Receber com' : 'Pagar com'}
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

          <DatePickerInput />
        </div>

        <Button type="submit" className="mt-6 w-full">
          Criar
        </Button>
      </form>
    </Modal>
  )
}
