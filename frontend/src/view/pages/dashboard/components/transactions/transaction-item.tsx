import { Transaction } from '../../../../../app/entities/transaction'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { formatDate } from '../../../../../app/utils/format-date'
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'
import { useDashboard } from '../dashboard-context'

interface TransactionItemProps {
  transaction: Transaction
  onClick?: () => void
}

export function TransactionItem({
  transaction,
  onClick,
}: TransactionItemProps) {
  const { areValuesVisible } = useDashboard()

  return (
    <div
      key={transaction.id}
      role="button"
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl bg-white p-4"
    >
      <div className="flex grow gap-3">
        <CategoryIcon
          type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
          category={transaction.transactionCategory.icon}
        />

        <div className="flex flex-col">
          <strong className="font-bold tracking-tight text-gray-800">
            {transaction.name}
          </strong>

          <span className="text-sm text-gray-600">
            {formatDate(new Date(transaction.date))}
          </span>
        </div>
      </div>

      <span
        className={cn(
          'font-medium tracking-tight',
          !areValuesVisible && 'blur-sm',
          transaction.type === 'INCOME' ? 'text-green-900' : 'text-red-900',
        )}
      >
        {transaction.type === 'INCOME' ? '+' : '-'}
        {formatCurrency(transaction.value)}
      </span>
    </div>
  )
}
