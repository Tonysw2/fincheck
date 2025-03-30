import { Plus } from 'lucide-react'

import { DropdownMenu } from '../../../components/dropdown-menu'
import { BankAccountIcon } from '../../../components/icons/BankAccountIcon'
import { CategoryIcon } from '../../../components/icons/categories/CategoryIcon'
import { useDashboard } from './dashboard-context'

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="fixed right-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-teal-900 text-white"
        >
          <Plus className="size-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="top"
        align="end"
        className="animate-slide-down-and-fade"
      >
        <DropdownMenu.Item onSelect={() => openNewTransactionModal('INCOME')}>
          <CategoryIcon type="income" />
          Nova Receita
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={() => openNewTransactionModal('EXPENSE')}>
          <CategoryIcon type="expense" />
          Nova Despesa
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={openNewAccountModal}>
          <BankAccountIcon />
          Nova Conta
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
