import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

interface TransactionsMonthsSliderControllerParams {
  initialMonth?: number
  onSelect?: (api: EmblaCarouselType) => void
}

export function useTransactionsMonthsSliderController({
  initialMonth,
  onSelect,
}: TransactionsMonthsSliderControllerParams) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    initialMonth ?? 0,
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: false,
    duration: 20,
    startIndex: initialMonth ?? 0,
  })

  const handleScrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index)
      }
    },
    [emblaApi],
  )

  const handlePrevSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const handleNextSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const handle = (api: EmblaCarouselType) => {
      setSelectedMonthIndex(api.selectedScrollSnap())
      onSelect?.(api)
    }

    emblaApi.on('select', handle)

    return () => {
      emblaApi.off('select', handle)
    }
  }, [emblaApi])

  return {
    selectedMonthIndex,
    emblaRef,
    handleScrollTo,
    handlePrevSlide,
    handleNextSlide,
  }
}
