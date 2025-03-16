import { EyeIcon } from '../../../../components/icons/EyeIcon'
import { AccountSlider } from './account-slider'

export function Accounts() {
  return (
    <div className="flex h-full flex-col gap-10 rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      <div className="flex flex-col">
        <span className="tracking-tight text-white">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-3xl font-bold text-white">R$ 100,00</strong>

          <button
            type="button"
            className="flex size-8 cursor-pointer items-center justify-center"
          >
            <EyeIcon open />
          </button>
        </div>
      </div>

      <AccountSlider />
    </div>
  )
}
