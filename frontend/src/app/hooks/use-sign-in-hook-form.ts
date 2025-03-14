import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SignInSchema, signInSchema } from '../schemas/validations/sign-in'

export function useSignInHookForm() {
  const { formState, register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return {
    formErrors: formState.errors,
    register,
    hookFormHandleSubmit: handleSubmit,
  }
}
