import { Loader2 } from 'lucide-react'

import { cn } from '../../../../../app/utils/cn'
import { EyeIcon } from '../../../../components/icons/EyeIcon'
import { AccountSlider } from './account-slider'
import { useAccountsController } from './use-accounts-controller'

export function Accounts() {
  const { accounts, isLoading, areValuesVisible, toggleValuesVisibility } =
    useAccountsController()

  let content

  if (isLoading) {
    content = (
      <div className="grid h-full place-content-center">
        <Loader2 className="size-10 animate-spin text-white" />
      </div>
    )
  }

  if (!isLoading) {
    content = (
      <>
        <div className="flex flex-col">
          <span className="tracking-tight text-white">Saldo total</span>

          <div className="flex items-center gap-2">
            <strong
              className={cn(
                'text-3xl font-bold text-white',
                !areValuesVisible && 'blur-md',
              )}
            >
              R$ 100,00
            </strong>

            <button
              type="button"
              onClick={toggleValuesVisibility}
              className="flex size-8 cursor-pointer items-center justify-center"
            >
              <EyeIcon open={!areValuesVisible} />
            </button>
          </div>
        </div>

        <AccountSlider accounts={accounts} />
      </>
    )
  }

  return (
    <div className="flex h-full flex-col gap-10 rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      {content}
    </div>
  )
}
