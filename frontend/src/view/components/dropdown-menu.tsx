import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '../../app/utils/cn'

export function DropdownMenuRoot(props: RadixDropdownMenu.DropdownMenuProps) {
  return <RadixDropdownMenu.Root {...props} />
}

export function DropdownMenuTrigger({
  className,
  ...props
}: RadixDropdownMenu.DropdownMenuTriggerProps) {
  return (
    <RadixDropdownMenu.Trigger
      className={cn('outline-none', className)}
      {...props}
    />
  )
}

export function DropdownMenuContent({
  className,
  ...props
}: RadixDropdownMenu.DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        sideOffset={4}
        className={cn(
          'rounded-2xl bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=top]:animate-slide-down-and-fade',
          'data-[side=bottom]:animate-slide-up-and-fade',
          className,
        )}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  )
}

export function DropdownMenuItem({
  className,
  ...props
}: RadixDropdownMenu.DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        'flex min-h-12 cursor-pointer items-center gap-2 rounded-lg bg-white p-2 text-sm text-gray-800 transition-colors outline-none data-[highlighted]:bg-gray-100',
        className,
      )}
      {...props}
    />
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
}
