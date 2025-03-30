import { NumericFormat } from 'react-number-format'

import { cn } from '../../app/utils/cn'

export interface InputCurrencyProps {
  error?: string
  className?: string
  value: string
  onChange: (value: string) => void
}

export function InputCurrency({
  error,
  className,
  value,
  onChange,
}: InputCurrencyProps) {
  return (
    <NumericFormat
      value={value}
      decimalSeparator=","
      thousandSeparator="."
      allowLeadingZeros={false}
      onValueChange={(values) => onChange(values.value)}
      className={cn(
        'w-full text-3xl font-bold tracking-tight text-gray-800 outline-none',
        error && 'text-red-900',
        className,
      )}
    />
  )
}
