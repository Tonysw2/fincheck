import { ComponentProps, useId } from 'react'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ type = 'text', placeholder, ...props }: InputProps) {
  const inputId = useId()

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="peer h-14 w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 placeholder-transparent transition-all outline-none placeholder-shown:pt-0 focus-within:border-gray-800"
      />

      <label
        htmlFor={inputId}
        // className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-700"
        className="pointer-events-none absolute top-2 left-3 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base"
      >
        {placeholder}
      </label>
    </div>
  )
}
