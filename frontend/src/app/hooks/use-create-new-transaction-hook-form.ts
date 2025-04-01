import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createTransactionSchema = z.object({
  bankAccountId: z.string().min(1, 'A conta bancária é obrigatória.'),
  categoryId: z.string().min(1, 'A categoria é obrigatória.'),
  name: z.string().min(1, 'O nome é obrigatório.'),
  value: z
    .string()
    .min(1, 'O valor é obrigatório.')
    .refine((val) => parseFloat(val) > 0, 'O valor deve ser maior que zero.'),
  date: z.date(),
})

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>

export function useCreateNewTransactionHookForm() {
  return useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      bankAccountId: '',
      categoryId: '',
      name: '',
      value: '0',
      date: new Date(),
    },
  })
}
