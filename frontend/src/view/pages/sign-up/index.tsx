import { Link } from 'react-router'

import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { useSignUpController } from './use-sign-up-controller'

export function SignUp() {
  const { formErrors, register, handleSubmit } = useSignUpController()

  return (
    <div className="space-y-12">
      <header className="flex flex-col items-center gap-1">
        <h1 className="text-2xl font-bold tracking-tighter">Crie sua conta</h1>

        <p className="space-x-2 tracking-tight">
          <span>Já possui uma conta?</span>

          <Link to="/sign-in" className="font-medium text-teal-900">
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Input
            type="text"
            placeholder="Nome"
            error={formErrors.name?.message}
            {...register('name')}
          />

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

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}
