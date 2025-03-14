import { Link } from 'react-router'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { useSignInController } from './use-sign-in-controller'

export function SignIn() {
  const { isPending, formErrors, register, handleSubmit } =
    useSignInController()

  return (
    <div className="space-y-12">
      <header className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold tracking-tighter">
          Entre em sua conta
        </h1>

        <p className="space-x-2 tracking-tight">
          <span>Novo por aqui?</span>

          <Link to="/sign-up" className="font-medium text-teal-900">
            Crie um conta
          </Link>
        </p>
      </header>

      <form noValidate className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Input
            type="email"
            placeholder="Email"
            error={formErrors.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="Password"
            error={formErrors.password?.message}
            {...register('password')}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={isPending}>
          Entrar
        </Button>
      </form>
    </div>
  )
}
