import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { useAuthContext } from '../../../app/hooks/use-auth'
import { useSignUpHookForm } from '../../../app/hooks/use-sign-up-hook-form'
import { useSignUpMutation } from '../../../app/hooks/use-sign-up-mutation'

export function useSignUpController() {
  const navigate = useNavigate()

  const { formErrors, register, hookFormHandleSubmit } = useSignUpHookForm()

  const { isPending, signUpFn } = useSignUpMutation()

  const { signIn } = useAuthContext()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signUpFn({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      signIn(accessToken)

      navigate('/dashboard')
    } catch {
      toast.error('Erro ao criar conta.')
    }
  })

  return {
    isPending,
    formErrors,
    register,
    handleSubmit,
  }
}
