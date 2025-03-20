import { ChevronDown } from 'lucide-react'

import { DropdownMenu } from '../../../../components/dropdown-menu'
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon'
import { IncomeIcon } from '../../../../components/icons/IncomeIcon'
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon'

export function TransactionsTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm">Transações</span>
          <ChevronDown className="stroke-2 text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="z-50 w-70">
        <DropdownMenu.Item>
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
