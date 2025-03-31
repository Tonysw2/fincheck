import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'

import { cn } from '../../app/utils/cn'

interface ModalProps {
  open: boolean
  title: string
  rightAction?: React.ReactNode
  children: React.ReactNode
  onClose?: () => void
}

export function Modal({
  open,
  title,
  rightAction,
  children,
  onClose,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
          )}
        />

        <DialogPrimitive.Content
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-100 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="flex h-12 items-center justify-between">
            <button
              onClick={onClose}
              className="flex size-12 items-center justify-center outline-none"
            >
              <X className="size-6 text-gray-800" />
            </button>

            <DialogPrimitive.Title className="text-lg font-bold tracking-tight text-gray-800">
              {title}
            </DialogPrimitive.Title>

            <div className="flex size-12 items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
