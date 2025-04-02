import { ChevronDown } from 'lucide-react'

import { DropdownMenu } from '../../../../components/dropdown-menu'
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon'
import { IncomeIcon } from '../../../../components/icons/IncomeIcon'
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon'

interface TransactionsTypeDropdownProps {
  onSelect: (type: 'INCOME' | 'EXPENSE' | undefined) => void
  selectedType: 'INCOME' | 'EXPENSE' | undefined
}

export function TransactionsTypeDropdown({
  onSelect,
  selectedType,
}: TransactionsTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2">
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm">
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === undefined && 'Transações'}
          </span>
          <ChevronDown className="stroke-2 text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-70">
        <DropdownMenu.Item onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
