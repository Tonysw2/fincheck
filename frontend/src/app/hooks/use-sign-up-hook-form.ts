import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { SignUpSchema, signUpSchema } from '../schemas/validations/sign-up'

export function useSignUpHookForm() {
  const { formState, register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  return {
    formErrors: formState.errors,
    register,
    hookFormHandleSubmit: handleSubmit,
  }
}
