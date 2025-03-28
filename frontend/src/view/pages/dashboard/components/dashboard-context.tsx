import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { localStorageKeys } from '../../../../app/config/local-storage-keys'

interface DashboardContextValue {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

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
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((state) => !state)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
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
        isNewAccountModalOpen,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
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
