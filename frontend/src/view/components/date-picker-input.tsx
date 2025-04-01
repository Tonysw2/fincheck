import { XCircle } from 'lucide-react'
import { useState } from 'react'

import { cn } from '../../app/utils/cn'
import { formatDate } from '../../app/utils/format-date'
import { DatePicker } from './date-picker'
import { PopoverContent, PopoverRoot, PopoverTrigger } from './popover'

interface DatePickerInputProps {
  error?: string
  className?: string
  value: Date
  onChange?: (value: Date) => void
}

export function DatePickerInput({
  value,
  error,
  className,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedChange] = useState(value)

  function handleChange(date: Date) {
    setSelectedChange(date)
    onChange?.(date)
  }

  return (
    <div>
      <PopoverRoot>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'relative h-14 w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left text-gray-700 transition-all outline-none focus-within:border-gray-700 [&>span]:line-clamp-1',
              error && 'border-red-900 focus-within:border-red-900',
              className,
            )}
          >
            <span className="pointer-events-none absolute top-2 left-3 text-xs text-gray-700">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <DatePicker value={selectedDate} onChange={handleChange} />
        </PopoverContent>
      </PopoverRoot>

      {error ? (
        <p className="mt-2 flex items-center gap-2 text-xs text-red-900">
          <XCircle className="size-3" />

          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}
