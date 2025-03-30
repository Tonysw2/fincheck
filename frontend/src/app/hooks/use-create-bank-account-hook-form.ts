import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createBankAccountSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  color: z.string().min(1, 'A cor é obrigatória.'),
  initialBalance: z.string().min(1, 'O balanço inicial é obrigatório.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
})

export type CreateBankAccountSchemaType = z.infer<
  typeof createBankAccountSchema
>

export function useCreateBankAccountHookForm() {
  return useForm<CreateBankAccountSchemaType>({
    resolver: zodResolver(createBankAccountSchema),
    defaultValues: {
      name: '',
      color: '',
      type: 'CHECKING',
      initialBalance: '0',
    },
  })
}
