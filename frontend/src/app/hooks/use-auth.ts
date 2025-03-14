import { useContext } from 'react'

import { AuthContext } from '../providers/auth-provider'

export function useAuthContext() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('You must use this hook inside a AuthProvider')
  }

  return ctx
}
