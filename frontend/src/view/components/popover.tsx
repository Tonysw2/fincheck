import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '../../app/utils/cn'

export function PopoverRoot(props: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger({
  className,
  ...props
}: PopoverPrimitive.PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      className={cn('outline-none', className)}
      {...props}
    />
  )
}

export function PopoverContent({
  className,
  ...props
}: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={cn(
          'z-[99] max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
