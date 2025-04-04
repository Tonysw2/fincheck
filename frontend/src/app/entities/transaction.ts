export interface Transaction {
  id: string
  name: string
  value: number
  date: string
  type: 'INCOME' | 'EXPENSE'
  bankAccountId: string
  transactionCategoryId: string
  transactionCategory: {
    id: string
    name: string
    icon: string
  }
}
