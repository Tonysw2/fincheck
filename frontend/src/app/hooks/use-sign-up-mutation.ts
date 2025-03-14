import { useMutation } from '@tanstack/react-query'

import { authService } from '../services/auth-service'

export function useSignUpMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService.signUp,
  })

  return {
    isPending,
    signUpFn: mutateAsync,
  }
}
