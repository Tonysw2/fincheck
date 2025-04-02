import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { SplashScreen } from '../../view/components/splash-screen'
import { localStorageKeys } from '../config/local-storage-keys'
import { User } from '../entities/user'
import { useGetMeQuery } from '../hooks/use-get-me-query'

type AuthContextType = {
  user: User | undefined
  signedIn: boolean
  signOut: () => void
  signIn: (accessToken: string) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider(props: { children: ReactNode }) {
  const queryCLient = useQueryClient()

  const [signedIn, setSignedIn] = useState(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    )

    return Boolean(storedAccessToken)
  })

  const { user, isSuccess, isError, isFetching } = useGetMeQuery({ signedIn })

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)
    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    queryCLient.removeQueries({ queryKey: ['me'] })
    setSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError || (isSuccess && !user)) {
      signOut()
    }
  }, [isError, user])

  return (
    <AuthContext.Provider
      value={{
        user,
        signedIn: isSuccess && signedIn,
        signIn,
        signOut,
      }}
    >
      {isFetching && <SplashScreen isLoading={isFetching} />}
      {!isFetching && props.children}
    </AuthContext.Provider>
  )
}
