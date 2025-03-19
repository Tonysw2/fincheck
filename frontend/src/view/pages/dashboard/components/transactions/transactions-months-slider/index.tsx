import { ChevronLeft, ChevronRight } from 'lucide-react'

import { MONTHS } from '../../../../../../app/config/months'
import { cn } from '../../../../../../app/utils/cn'
import { useTransactionsMonthsSliderController } from './use-transactions-months-slider-controller'

export function TransactionsMonthsSlider() {
  const {
    selectedMonthIndex,
    emblaRef,
    handleScrollTo,
    handlePrevSlide,
    handleNextSlide,
  } = useTransactionsMonthsSliderController()

  return (
    <div className="embla @container relative">
      <button
        type="button"
        onClick={handlePrevSlide}
        className="absolute left-0 z-10 flex size-12 cursor-pointer items-center justify-center bg-linear-to-r from-gray-100 from-30% to-transparent"
      >
        <ChevronLeft className="mr-1 size-6 text-gray-800" />
      </button>

      <button
        type="button"
        onClick={handleNextSlide}
        className="absolute right-0 z-10 flex size-12 cursor-pointer items-center justify-center bg-linear-to-l from-gray-100 from-30% to-transparent"
      >
        <ChevronRight className="ml-1 size-6 text-gray-800" />
      </button>

      <div
        ref={emblaRef}
        className="embla__viewport overflow-hidden px-6 @sm:px-8"
      >
        <div className="embla__container -ml-4 flex">
          {MONTHS.map((month, monthIndex) => (
            <div
              key={month}
              className="embla__slide shrink-0 grow-0 basis-1/3 pl-4"
            >
              <button
                type="button"
                onClick={() => handleScrollTo(monthIndex)}
                className={cn(
                  'flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-sm/snug font-medium tracking-tight text-gray-700',
                  selectedMonthIndex === monthIndex && 'bg-white text-gray-800',
                )}
              >
                {month}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
