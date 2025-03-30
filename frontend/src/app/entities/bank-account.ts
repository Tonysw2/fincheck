export interface BankAccount {
  id: string
  name: string
  color: string
  currentBalance: number
  initialBalance: number
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}
