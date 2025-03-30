import { ChevronLeftIcon, ChevronRightIcon, Plus } from 'lucide-react'

import { GetAllBankAccountsResponse } from '../../../../../../app/services/bank-account-service/get-all'
import { useDashboard } from '../../dashboard-context'
import { AccountCard } from '../account-card'
import { useAccountSliderController } from './use-account-slider-controller'

interface AccountSliderProps {
  accounts: GetAllBankAccountsResponse
}

export function AccountSlider({ accounts }: AccountSliderProps) {
  const {
    canScrollPrev,
    canScrollNext,
    emblaRef,
    handleGoPrevSlide,
    handleGoNextSlide,
  } = useAccountSliderController()

  const { openNewAccountModal } = useDashboard()

  let navigationButtons, content

  if (accounts.length === 0) {
    navigationButtons = null

    content = (
      <button
        type="button"
        onClick={openNewAccountModal}
        className="flex h-51 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-teal-600 p-4 text-white"
      >
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-white">
          <Plus className="size-6" />
        </div>

        <span className="inline-flex w-32 text-center font-medium tracking-tight">
          Cadastre uma nova conta
        </span>
      </button>
    )
  }

  if (accounts.length > 0) {
    navigationButtons = (
      <div>
        <button
          type="button"
          disabled={!canScrollPrev}
          onClick={handleGoPrevSlide}
          className="cursor-pointer rounded-full py-3 pr-3.5 pl-2.5 transition-colors hover:not-disabled:bg-black/10 disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-6 text-white" />
        </button>

        <button
          type="button"
          disabled={!canScrollNext}
          onClick={handleGoNextSlide}
          className="cursor-pointer rounded-full py-3 pr-2.5 pl-3.5 transition-colors hover:not-disabled:bg-black/10 disabled:opacity-40"
        >
          <ChevronRightIcon className="size-6 text-white" />
        </button>
      </div>
    )

    content = (
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container @container flex space-x-4 pr-8 @md:pr-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              type={account.type}
              color={account.color}
              balance={account.currentBalance}
              name={account.name}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="embla flex grow flex-col justify-end gap-4">
      <div className="flex items-center justify-between">
        <strong className="text-lg font-bold tracking-tight text-white">
          Minhas contas
        </strong>

        {navigationButtons}
      </div>

      {content}
    </div>
  )
}
