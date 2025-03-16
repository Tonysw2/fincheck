import { Logo } from '../../components/logo'
import { UserMenu } from '../../components/user-menu'
import { Accounts } from './components/accounts'
import { Transactions } from './components/transactions'

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-gray-50 p-4 md:p-8 md:pt-6">
      <header className="flex h-12 items-center justify-between">
        <Logo className="h-6 text-teal-900" />

        <UserMenu />
      </header>

      <main className="flex grow flex-col gap-8 md:flex-row md:gap-4">
        <div className="w-full md:w-1/2">
          <Accounts />
        </div>

        <div className="w-full md:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  )
}
