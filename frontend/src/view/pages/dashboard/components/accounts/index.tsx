import { Loader2 } from 'lucide-react'

import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { EyeIcon } from '../../../../components/icons/EyeIcon'
import { AccountSlider } from './account-slider'
import { useAccountsController } from './use-accounts-controller'

export function Accounts() {
  const {
    bankAccounts,
    currentBalance,
    areValuesVisible,
    isBankAccountsPending,
    toggleValuesVisibility,
  } = useAccountsController()

  let content

  if (isBankAccountsPending) {
    content = (
      <div className="grid h-full place-content-center">
        <Loader2 className="size-10 animate-spin text-white" />
      </div>
    )
  }

  if (!isBankAccountsPending) {
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
              {formatCurrency(currentBalance)}
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

        <AccountSlider accounts={bankAccounts} />
      </>
    )
  }

  return (
    <div className="flex h-full flex-col gap-10 rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      {content}
    </div>
  )
}
