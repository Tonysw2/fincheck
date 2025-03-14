import { useAuthContext } from '../../app/hooks/use-auth'
import { Button } from '../components/button'

export function Dashboard() {
  const { signOut } = useAuthContext()

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      <h1>Dashboard</h1>

      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}
