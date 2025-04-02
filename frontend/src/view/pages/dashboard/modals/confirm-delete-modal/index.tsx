import { Button } from '../../../../components/button'
import { TrashIcon } from '../../../../components/icons/TrashIcon'
import { Modal } from '../../../../components/modal'

interface ConfirmDeleteModalProps {
  title: string
  description?: string
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDeleteModal({
  title,
  description,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="mt-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex size-13 items-center justify-center rounded-full bg-red-100">
            <TrashIcon className="size-6 text-red-900" />
          </div>

          <p className="w-45 text-center font-bold tracking-tight text-gray-800">
            {title}
          </p>

          {description && (
            <p className="text-center tracking-tight text-gray-800">
              {description}
            </p>
          )}
        </div>

        <div className="mt-10 space-y-4">
          <Button
            type="button"
            variant="danger"
            className="w-full"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Sim, desejo excluir
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isLoading}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
