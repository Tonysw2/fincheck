import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Transaction } from '../entities/transaction'

const updateTransactionSchema = z.object({
  bankAccountId: z.string().min(1, 'A conta bancária é obrigatória.'),
  categoryId: z.string().min(1, 'A categoria é obrigatória.'),
  name: z.string().min(1, 'O nome é obrigatório.'),
  value: z
    .string()
    .min(1, 'O valor é obrigatório.')
    .refine((val) => parseFloat(val) > 0, 'O valor deve ser maior que zero.'),
  date: z.date(),
})

export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>

export function useUpdateTransactionHookForm(transaction: Transaction) {
  return useForm<UpdateTransactionSchema>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      bankAccountId: transaction.bankAccountId ?? '',
      categoryId: transaction.transactionCategory?.id ?? '',
      name: transaction.name ?? '',
      value: transaction.value ? String(transaction.value) : '0',
      date: transaction.date ? new Date(transaction.date) : new Date(),
    },
  })
}
