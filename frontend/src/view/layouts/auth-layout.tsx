import { Outlet } from 'react-router'

import illustration from '../../assets/login.png'
import { Logo } from '../components/logo'

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex h-full basis-full flex-col items-center justify-center gap-16 lg:basis-1/2">
        <Logo className="h-6 text-gray-500" />

        <div className="flex w-full max-w-126 flex-col px-8">
          <Outlet />
        </div>
      </div>

      <div className="hidden h-full shrink-0 basis-1/2 flex-col items-center justify-center p-8 lg:flex">
        <div className="relative h-full max-h-240 max-w-164">
          <img
            src={illustration}
            className="h-full rounded-4xl object-cover select-none"
          />

          <div className="absolute right-0 bottom-0 left-0 space-y-6 rounded-b-4xl bg-white px-10 py-12">
            <Logo className="h-8 text-teal-900" />

            <p className="text-xl font-medium text-gray-800">
              Gerencie suas finanças pessoais de uma forma simples com o
              fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
