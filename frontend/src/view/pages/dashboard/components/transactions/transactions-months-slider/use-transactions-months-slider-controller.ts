import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export function useTransactionsMonthsSliderController() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: false,
    duration: 20,
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
