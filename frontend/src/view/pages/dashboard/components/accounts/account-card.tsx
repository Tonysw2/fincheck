import { BankAccount } from '../../../../../app/entities/bank-account'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { BankAccountTypeIcon } from '../../../../components/icons/BankAccountTypeIcon'
import { useDashboard } from '../dashboard-context'

interface AccountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: AccountCardProps) {
  const { name, color, currentBalance, type } = data

  const { openUpdateBankAccountModal } = useDashboard()

  const { areValuesVisible } = useDashboard()

  return (
    <div
      role="button"
      style={{ borderColor: color }}
      onClick={() => openUpdateBankAccountModal(data)}
      className="embla__slide flex h-50 shrink-0 grow-0 basis-[calc(100%-var(--spacing)*4)] flex-col justify-between rounded-2xl border-b-4 bg-white p-4 @md:basis-[calc(50%-var(--spacing)*4)]"
    >
      <div className="flex flex-col gap-4">
        <BankAccountTypeIcon type={type} />
        <span className="font-medium tracking-tight text-gray-800">{name}</span>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            'font-medium tracking-tight text-gray-800',
            !areValuesVisible && 'blur-sm',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>

        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  )
}
