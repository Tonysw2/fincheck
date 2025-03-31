import { Loader2 } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '../../app/utils/cn'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  variant?: 'danger' | 'ghost'
}

export function Button({
  children,
  disabled,
  isLoading,
  className = '',
  variant,
  ...props
}: ButtonProps) {
  let content = children

  if (isLoading) {
    content = <Loader2 className="size-6 animate-spin" />
  }

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        variant === 'danger' && 'bg-red-900 hover:bg-red-900/90',
        variant === 'ghost' &&
          'border border-gray-700 bg-transparent text-gray-700 hover:bg-gray-700/10',
        className,
      )}
    >
      {content}
    </button>
  )
}
