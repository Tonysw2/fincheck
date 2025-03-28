import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import { Modal } from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useDashboard } from '../../components/dashboard-context'

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form className="mt-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input type="text" placeholder="Nome da conta" />

          <Select
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
                value: 'INVESTMENT',
                label: 'Investimentos',
              },
            ]}
          />
        </div>
      </form>
    </Modal>
  )
}
