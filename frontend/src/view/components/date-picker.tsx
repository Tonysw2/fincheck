import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'

import { capitalizeFirstLetter } from '../../app/utils/capitalize-first-letter'

interface DatePickerProps {
  value: Date
  onChange(date: Date): void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      mode="single"
      locale={ptBR}
      selected={value}
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        month_caption: 'flex items-center justify-between py-2 pl-1.5',
        caption_label: 'font-medium text-gray-900',
        nav: 'absolute right-3 top-6 flex gap-1',
        chevron: 'fill-teal-800',
        button_previous: 'flex items-center justify-center !bg-transparent',
        button_next: 'flex items-center justify-center !bg-transparent',
        weekday: 'text-xs font-medium uppercase text-gray-500',
        today: 'rounded-full bg-gray-100 font-bold text-gray-900',
        day: 'group/day text-gray-700',
        day_button:
          'flex items-center justify-center size-10 rounded-full cursor-pointer text-xl hover:bg-teal-200 group-data-[selected=true]/day:bg-teal-900 group-data-[selected=true]/day:not-hover:text-white group-data-[selected=true]/day:not-hover:font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => {
          return capitalizeFirstLetter(format(date, 'LLLL yyyy', options))
        },
      }}
    />
  )
}
