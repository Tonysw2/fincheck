import { LogOut } from 'lucide-react'

import { useAuthContext } from '../../app/hooks/use-auth'
import { DropdownMenu } from '../components/dropdown-menu'

export function UserMenu() {
  const { signOut } = useAuthContext()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        <div className="flex size-12 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
          <span className="text-sm font-medium tracking-tight text-teal-900">
            AR
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" className="w-32">
        <DropdownMenu.Item className="justify-between" onClick={signOut}>
          Sair <LogOut className="size-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
