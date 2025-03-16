import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export function useAccountSliderController() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const handleGoPrevSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const handleGoNextSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const handleCanGoPrevAndNext = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('init', handleCanGoPrevAndNext)
    emblaApi.on('select', handleCanGoPrevAndNext)

    return () => {
      emblaApi.off('init', handleCanGoPrevAndNext)
      emblaApi.off('select', handleCanGoPrevAndNext)
    }
  }, [emblaApi, handleCanGoPrevAndNext])

  return {
    canScrollPrev,
    canScrollNext,
    emblaRef,
    handleGoPrevSlide,
    handleGoNextSlide,
  }
}
