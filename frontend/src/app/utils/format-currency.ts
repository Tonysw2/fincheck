export function formatCurrency(value: number) {
  return Intl.NumberFormat('py-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
