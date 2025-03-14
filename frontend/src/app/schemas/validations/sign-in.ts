import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Informe um email válido.' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 dígitos.' }),
})

export type SignInSchema = z.infer<typeof signInSchema>
