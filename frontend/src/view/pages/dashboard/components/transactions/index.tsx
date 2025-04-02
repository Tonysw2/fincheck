import { Loader2 } from 'lucide-react'

import emptyStateImage from '../../../../../assets/empty-state.svg'
import { FilterIcon } from '../../../../components/icons/FilterIcon'
import { UpdateTransactionModal } from '../../modals/update-transaction-modal'
import { TransactionItem } from './transaction-item'
import { TransactionsFiltersModal } from './transactions-filter-modal'
import { TransactionsMonthsSlider } from './transactions-months-slider'
import { TransactionsTypeDropdown } from './transactions-type-dropdown'
import { useTransactionsController } from './use-transactions-controller'

export function Transactions() {
  const {
    transactions,
    hasTransactions,
    transactionsFilters,
    isTransactionsLoading,
    isTransactionsFetching,
    transactionBeingEdited,
    isTransactionsFiltersModalOpen,
    isUpdateTransactionModalOpen,
    handleApplyFilters,
    handleFiltersChange,
    handleOpenTransactionsFiltersModal,
    handleCloseTransactionsFiltersModal,
    handleOpenUpdateTransactionModal,
    handleCloseUpdateTransactionModal,
  } = useTransactionsController()

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl bg-gray-100 px-4 py-6 md:p-10">
      {isTransactionsLoading && (
        <div className="grid h-full place-content-center">
          <Loader2 className="size-10 animate-spin text-teal-900" />
        </div>
      )}

      {!isTransactionsLoading && (
        <>
          <TransactionsFiltersModal
            open={isTransactionsFiltersModalOpen}
            onClose={handleCloseTransactionsFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <TransactionsTypeDropdown
                selectedType={transactionsFilters.type}
                onSelect={(type) => handleFiltersChange({ type })}
              />

              <button
                type="button"
                onClick={handleOpenTransactionsFiltersModal}
              >
                <FilterIcon />
              </button>
            </div>

            <TransactionsMonthsSlider
              initialMonth={transactionsFilters.month}
              handleFiltersChange={handleFiltersChange}
            />
          </header>

          <div className="grow space-y-2 overflow-auto">
            {isTransactionsFetching && (
              <div className="grid h-full place-content-center">
                <Loader2 className="size-10 animate-spin text-teal-900" />
              </div>
            )}

            {!isTransactionsFetching && !hasTransactions && (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-center text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {!isTransactionsFetching && hasTransactions && (
              <>
                {transactionBeingEdited && (
                  <UpdateTransactionModal
                    open={isUpdateTransactionModalOpen}
                    transaction={transactionBeingEdited}
                    onClose={handleCloseUpdateTransactionModal}
                  />
                )}

                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() =>
                      handleOpenUpdateTransactionModal(transaction)
                    }
                  />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
