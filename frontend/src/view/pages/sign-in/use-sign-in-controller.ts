import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { useAuthContext } from '../../../app/hooks/use-auth'
import { useSignInHookForm } from '../../../app/hooks/use-sign-in-hook-form'
import { useSignInMutation } from '../../../app/hooks/use-sign-in-mutation'

export function useSignInController() {
  const navigate = useNavigate()

  const { formErrors, register, hookFormHandleSubmit } = useSignInHookForm()

  const { isPending, signInFn } = useSignInMutation()

  const { signIn } = useAuthContext()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signInFn({
        email: data.email,
        password: data.password,
      })

      signIn(accessToken)

      navigate('/dashboard')
    } catch {
      toast.error('Erro ao fazer login.')
    }
  })

  return {
    isPending,
    formErrors,
    register,
    handleSubmit,
  }
}
