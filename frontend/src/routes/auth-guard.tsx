import { Navigate, Outlet } from 'react-router'

import { useAuthContext } from '../app/hooks/use-auth'

export function AuthGuard(props: { isPrivate: boolean }) {
  const { signedIn } = useAuthContext()

  if (!signedIn && props.isPrivate) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}
