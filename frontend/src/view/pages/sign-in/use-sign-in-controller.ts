import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { httpClient } from '../../../app/services/http-client'

const signInSchema = z.object({
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 dígitos.' }),
})

type SignInSchema = z.infer<typeof signInSchema>

export function useSignInController() {
  const {
    formState: { errors: formErrors },
    register,
    handleSubmit: hookFormHandleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await httpClient.post('/auth/sign-in', data)
  })

  return {
    formErrors,
    register,
    handleSubmit,
  }
}
