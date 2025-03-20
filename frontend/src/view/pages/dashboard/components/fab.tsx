import { Plus } from 'lucide-react'

import { DropdownMenu } from '../../../components/dropdown-menu'
import { BankAccountIcon } from '../../../components/icons/BankAccountIcon'
import { CategoryIcon } from '../../../components/icons/categories/CategoryIcon'

export function Fab() {
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
        <DropdownMenu.Item>
          <CategoryIcon type="income" />
          Nova Despesa
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <CategoryIcon type="expense" />
          Nova Receita
        </DropdownMenu.Item>

        <DropdownMenu.Item>
          <BankAccountIcon />
          Nova Conta
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
