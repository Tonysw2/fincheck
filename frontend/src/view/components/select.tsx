import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../../app/utils/cn'

interface SelectProps {
  className?: string
  error?: string
  options: { label: string; value: string }[]
}

export function Select({ className, error, options }: SelectProps) {
  const [value, setValue] = useState('')

  return (
    <div>
      <div className="relative">
        <label
          htmlFor=""
          className={cn(
            'pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-gray-700 transition-all',
            value && 'top-2 translate-y-0 text-xs',
          )}
        >
          Selecione uma fruta
        </label>

        <SelectPrimitive.Root value={value} onValueChange={setValue}>
          <SelectPrimitive.Trigger
            className={cn(
              'relative h-14 w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left transition-all outline-none focus-within:border-gray-800 [&>span]:line-clamp-1',
              error && 'border-red-900 focus-within:border-red-900',
              className,
            )}
          >
            <SelectPrimitive.Value />

            <SelectPrimitive.Icon className="absolute top-1/2 right-3 -translate-y-1/2">
              <ChevronDown className="size-6 text-gray-800" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="z-[99] max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
              <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUp />
              </SelectPrimitive.ScrollUpButton>

              <SelectPrimitive.Viewport className="p-2">
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className="rounded-lg p-2 text-sm text-gray-800 transition-colors outline-none data-[highlighted]:bg-gray-100 data-[state=checked]:font-bold"
                  >
                    <SelectPrimitive.ItemText>
                      {opt.value}
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
