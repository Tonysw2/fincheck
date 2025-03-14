import { Transition } from '@headlessui/react'

import { Logo } from './logo'

interface SplashScreenProps {
  isLoading: boolean
}

export function SplashScreen({ isLoading }: SplashScreenProps) {
  return (
    <Transition show={isLoading}>
      <div className="grid h-screen w-full place-items-center bg-teal-900 transition duration-300 ease-in data-[closed]:opacity-0">
        <Logo className="animate-bounce text-white" />
      </div>
    </Transition>
  )
}
