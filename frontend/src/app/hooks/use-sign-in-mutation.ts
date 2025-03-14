import { useMutation } from '@tanstack/react-query'

import { authService } from '../services/auth-service'

export function useSignInMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService.signIn,
  })

  return {
    isPending,
    signInFn: mutateAsync,
  }
}
