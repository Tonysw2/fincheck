import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { AccountCard } from '../account-card'
import { useAccountSliderController } from './use-account-slider-controller'

export function AccountSlider() {
  const {
    canScrollPrev,
    canScrollNext,
    emblaRef,
    handleGoPrevSlide,
    handleGoNextSlide,
  } = useAccountSliderController()

  return (
    <div className="embla flex grow flex-col justify-end gap-4">
      <div className="flex items-center justify-between">
        <strong className="text-lg font-bold tracking-tight text-white">
          Minhas contas
        </strong>

        <div>
          <button
            type="button"
            onClick={handleGoPrevSlide}
            disabled={!canScrollPrev}
            className="cursor-pointer rounded-full py-3 pr-3.5 pl-2.5 transition-colors hover:not-disabled:bg-black/10 disabled:opacity-40"
          >
            <ChevronLeftIcon className="size-6 text-white" />
          </button>

          <button
            type="button"
            onClick={handleGoNextSlide}
            disabled={!canScrollNext}
            className="cursor-pointer rounded-full py-3 pr-2.5 pl-3.5 transition-colors hover:not-disabled:bg-black/10 disabled:opacity-40"
          >
            <ChevronRightIcon className="size-6 text-white" />
          </button>
        </div>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {Array.from({ length: 10 }, (_, index) => (
            <AccountCard
              key={index.toString()}
              type="CHECKING"
              color="purple"
              balance={5123}
              name="Nubank"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
