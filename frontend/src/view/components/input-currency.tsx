import { NumericFormat } from 'react-number-format'

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      allowLeadingZeros={false}
      defaultValue="0"
      className="w-full text-3xl font-bold tracking-tight text-gray-800 outline-none"
    />
  )
}
