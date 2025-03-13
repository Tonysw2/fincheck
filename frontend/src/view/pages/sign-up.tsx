import { Link } from 'react-router'

import { Button } from '../components/button'
import { Input } from '../components/input'

export function SignUp() {
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

      <form className="space-y-6">
        <div className="grid gap-4">
          <Input type="text" placeholder="Nome" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}
