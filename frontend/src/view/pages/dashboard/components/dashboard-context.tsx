import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { localStorageKeys } from '../../../../app/config/local-storage-keys'
import { BankAccount } from '../../../../app/entities/bank-account'

interface DashboardContextValue {
  areValuesVisible: boolean
  toggleValuesVisibility: () => void
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  isNewAccountModalOpen: boolean
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
  isNewTransactionModalOpen: boolean
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void
  closeNewTransactionModal: () => void
  isUpdateBankAccountModalOpen: boolean
  openUpdateBankAccountModal: (account: BankAccount) => void
  closeUpdateBankAccountModal: () => void
  bankAccountBeingUpdated: null | BankAccount
}

export const DashboardContext = createContext<DashboardContextValue | null>(
  null,
)

export function DashboardContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storedVal = localStorage.getItem(localStorageKeys.ARE_VALUES_VISIBLE)

    if (!storedVal) return false

    try {
      return JSON.parse(storedVal) === true
    } catch {
      return false
    }
  })
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false)
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null)
  const [isUpdateBankAccountModalOpen, setIsUpdateBankAccountModalOpen] =
    useState(false)
  const [bankAccountBeingUpdated, setBankAccountBeingUpdated] =
    useState<null | BankAccount>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((state) => !state)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  const openUpdateBankAccountModal = useCallback((bankAccount: BankAccount) => {
    setBankAccountBeingUpdated(bankAccount)
    setIsUpdateBankAccountModalOpen(true)
  }, [])

  const closeUpdateBankAccountModal = useCallback(() => {
    setBankAccountBeingUpdated(null)
    setIsUpdateBankAccountModalOpen(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
      JSON.stringify(areValuesVisible),
    )
  }, [areValuesVisible])

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        newTransactionType,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        isUpdateBankAccountModalOpen,
        openUpdateBankAccountModal,
        closeUpdateBankAccountModal,
        bankAccountBeingUpdated,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)

  if (!ctx) {
    throw new Error('You should use this inside dashboard context.')
  }

  return ctx
}
