import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 dígitos.' }),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function useSignUpController() {
  const {
    formState: { errors: formErrors },
    register,
    handleSubmit: hookFormSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSubmit = hookFormSubmit((data) => console.log(data))

  return {
    formErrors,
    register,
    handleSubmit,
  }
}
