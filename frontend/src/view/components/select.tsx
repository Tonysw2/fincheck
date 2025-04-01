import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Loader2, XCircle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../../app/utils/cn'

interface SelectProps {
  error?: string
  className?: string
  placeholder?: string
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  isLoading?: boolean
}

export function Select({
  error,
  className,
  placeholder,
  options,
  value,
  onChange,
  isLoading = false,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value)

  function handleChange(value: string) {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-700 transition-all',
            value && 'top-2 translate-y-0 text-xs',
            isLoading && 'opacity-50',
          )}
        >
          {placeholder}
        </label>

        <SelectPrimitive.Root
          value={selectedValue}
          onValueChange={handleChange}
          disabled={isLoading}
        >
          <SelectPrimitive.Trigger
            className={cn(
              'relative h-14 w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left transition-all outline-none focus-within:border-gray-800 [&>span]:line-clamp-1',
              error && 'border-red-900 focus-within:border-red-900',
              className,
              isLoading && 'cursor-not-allowed opacity-50',
            )}
          >
            <SelectPrimitive.Value />

            <SelectPrimitive.Icon className="absolute top-1/2 right-3 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="size-6 animate-spin text-gray-800" />
              ) : (
                <ChevronDown className="size-6 text-gray-800" />
              )}
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="z-[99] max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUp />
              </SelectPrimitive.ScrollUpButton>

              <SelectPrimitive.Viewport>
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className="rounded-lg p-2 text-sm text-gray-800 transition-colors outline-none select-none data-[highlighted]:bg-gray-100 data-[state=checked]:font-bold"
                  >
                    <SelectPrimitive.ItemText>
                      {opt.label}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDown />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>

      {error ? (
        <p className="mt-2 flex items-center gap-2 text-xs text-red-900">
          <XCircle className="size-3" />

          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}
