import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useDashboard } from '../../view/pages/dashboard/components/dashboard-context'

const updateBankAccountSchema = z.object({
  id: z.string().uuid('ID inválido.'),
  name: z.string().min(1, 'O nome é obrigatório.'),
  color: z.string().min(1, 'A cor é obrigatória.'),
  initialBalance: z.string().min(1, 'O balanço inicial é obrigatório.'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
})

export type UpdateBankAccountSchemaType = z.infer<
  typeof updateBankAccountSchema
>

export function useUpdateBankAccountHookForm() {
  const { bankAccountBeingUpdated } = useDashboard()

  return useForm<UpdateBankAccountSchemaType>({
    resolver: zodResolver(updateBankAccountSchema),
    defaultValues: {
      id: bankAccountBeingUpdated?.id || '',
      name: bankAccountBeingUpdated?.name || '',
      color: bankAccountBeingUpdated?.color || '',
      type: bankAccountBeingUpdated?.type || 'CHECKING',
      initialBalance: bankAccountBeingUpdated?.initialBalance.toString() || '0',
    },
  })
}
