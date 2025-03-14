import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 dígitos.' }),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
