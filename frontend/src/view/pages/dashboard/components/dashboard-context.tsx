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
  toggleValuesVisibility: () => void
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

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((state) => !state)
  }, [])

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
      JSON.stringify(areValuesVisible),
    )
  }, [areValuesVisible])

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
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
