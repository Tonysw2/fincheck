import { formatCurrency } from '../../../../../app/utils/format-currency'
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon'

interface AccountCardProps {
  color: string
  name: string
  balance: number
  type: 'CASH' | 'CHECKING' | 'INVESTMENT'
}

export function AccountCard({ type, color, name, balance }: AccountCardProps) {
  return (
    <div
      className="embla__slide flex h-50 flex-col justify-between rounded-2xl border-b-4 bg-white p-4"
      style={{ borderColor: color }}
    >
      <div className="flex flex-col gap-4">
        <BankAccountTypeIcon type={type} />
        <span className="font-medium tracking-tight text-gray-800">{name}</span>
      </div>

      <div className="flex flex-col">
        <span className="font-medium tracking-tight text-gray-800">
          {formatCurrency(balance)}
        </span>

        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  )
}
