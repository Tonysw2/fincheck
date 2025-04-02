import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '../../../../../../app/utils/cn'
import { Button } from '../../../../../components/button'
import { Modal } from '../../../../../components/modal'
import { useTransactionsFilterModal } from './use-transactions-filter-modal'

interface TransactionsFilterModalProps {
  open: boolean
  onClose: () => void
  onApplyFilters: (filters: { bankAccountId?: string; year: number }) => void
}

export function TransactionsFiltersModal({
  open,
  onClose,
  onApplyFilters,
}: TransactionsFilterModalProps) {
  const {
    bankAccounts,
    selectedYear,
    selectedBankAccountId,
    handleChangeYear,
    handleSelectBankAccount,
  } = useTransactionsFilterModal()

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="mt-10 space-y-2">
        <span className="text-lg font-bold tracking-tight text-gray-800">
          Conta
        </span>

        <div className="space-y-2">
          {bankAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'w-full rounded-2xl p-2 text-left text-gray-800 transition-colors hover:bg-gray-200',
                account.id === selectedBankAccountId && 'bg-gray-200',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-2 text-gray-800">
        <span className="text-lg font-bold tracking-tight">Ano</span>

        <div className="flex max-w-52 items-center gap-4">
          <button
            type="button"
            onClick={() => handleChangeYear(-1)}
            className="flex size-12 items-center justify-center p-3"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div className="grow text-center">
            <span className="text-sm font-medium">{selectedYear}</span>
          </div>

          <button
            type="button"
            onClick={() => handleChangeYear(1)}
            className="flex size-12 items-center justify-center p-3"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>

      <Button
        type="button"
        onClick={() =>
          onApplyFilters({
            year: selectedYear,
            bankAccountId: selectedBankAccountId,
          })
        }
        className="mt-10 w-full"
      >
        Aplicar filtros
      </Button>
    </Modal>
  )
}
