import { ChevronDown, Loader2 } from 'lucide-react'

import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import emptyStateImage from '../../../../../assets/empty-state.svg'
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon'
import { FilterIcon } from '../../../../components/icons/FilterIcon'
import { TransactionsIcon } from '../../../../components/icons/TransactionsIcon'
import { TransactionsMonthsSlider } from './transactions-months-slider'
import { useTransactionsController } from './use-transactions-controller'

export function Transactions() {
  const { transactions, isPending, isFetching, areValuesVisible } =
    useTransactionsController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl bg-gray-100 px-4 py-6 md:p-10">
      {isPending && (
        <div className="grid h-full place-content-center">
          <Loader2 className="size-10 animate-spin text-teal-900" />
        </div>
      )}

      {!isPending && (
        <>
          <header className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm">Transações</span>
                <ChevronDown className="stroke-2 text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <TransactionsMonthsSlider />
          </header>

          <div className="grow space-y-2 overflow-auto">
            {isFetching && (
              <div className="grid h-full place-content-center">
                <Loader2 className="size-10 animate-spin text-teal-900" />
              </div>
            )}

            {!isFetching && !hasTransactions && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-center text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {!isFetching &&
              transactions.length > 0 &&
              Array.from({ length: 10 }, (_, index) => (
                <div
                  key={String(index)}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4"
                >
                  <div className="flex grow gap-3">
                    <CategoryIcon type="expense" category="food" />

                    <div className="flex flex-col">
                      <strong className="font-bold tracking-tight text-gray-800">
                        Almoço
                      </strong>

                      <span className="text-sm text-gray-600">
                        {Intl.DateTimeFormat('pt-br', {
                          dateStyle: 'short',
                        }).format(new Date())}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'font-medium tracking-tight text-green-800',
                      !areValuesVisible && 'blur-sm',
                    )}
                  >
                    {formatCurrency(100)}
                  </span>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
