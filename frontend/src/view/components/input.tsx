import { XCircle } from 'lucide-react'
import { ComponentProps, forwardRef, useId } from 'react'

import { cn } from '../../app/utils/cn'

interface InputProps extends ComponentProps<'input'> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', placeholder, error, className = '', ...props }, ref) => {
    const inputId = useId()

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          id={inputId}
          placeholder=" "
          className={cn(
            'peer flex h-14 w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 transition-all outline-none placeholder-shown:pt-0 focus-within:border-gray-800',
            error && 'border-red-900 focus-within:border-red-900',
            className,
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute top-2 left-3 text-xs text-gray-700 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error ? (
          <p className="mt-2 flex items-center gap-2 text-xs text-red-900">
            <XCircle className="size-3" />

            <span>{error}</span>
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
