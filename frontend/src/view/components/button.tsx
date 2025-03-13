import { ComponentProps } from 'react'

import { cn } from '../../app/utils/cn'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        className,
      )}
    >
      {children}
    </button>
  )
}
