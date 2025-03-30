import { ChevronDownIcon, XCircle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../../app/utils/cn'
import { DropdownMenu } from './dropdown-menu'
import { ColorIcon } from './icons/ColorIcon'

interface ColorsDropdownInputProps {
  error?: string
  className?: string
  value: string
  onChange: (value: string) => void
}

type Color = {
  bg: string
  color: string
}

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' },
]
export function ColorsDropdownInput({
  error,
  className,
  value,
  onChange,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(() => {
    if (!value) {
      return null
    }

    return colors.find((c) => c.color === value) ?? null
  })

  function handleSelect(color: Color) {
    setSelectedColor(color)
    onChange(color.color)
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className={cn(
              'relative h-14 w-full rounded-lg border border-gray-500 bg-white px-3 text-left text-gray-700 transition-all outline-none focus-within:border-gray-700 [&>span]:line-clamp-1',
              error && 'border-red-900 focus-within:border-red-900',
              className,
            )}
          >
            <span>Color</span>

            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {selectedColor && <ColorIcon {...selectedColor} />}

              {!selectedColor && (
                <ChevronDownIcon className="size-6 text-gray-800" />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="grid grid-cols-4">
          {colors.map((color) => (
            <DropdownMenu.Item
              key={color.color}
              onClick={() => handleSelect(color)}
            >
              <ColorIcon bg={color.bg} color={color.color} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error ? (
        <p className="mt-2 flex items-center gap-2 text-xs text-red-900">
          <XCircle className="size-3" />

          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}
