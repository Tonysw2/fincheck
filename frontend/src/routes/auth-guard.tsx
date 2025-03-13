import { Navigate, Outlet } from 'react-router'

export function AuthGuard(props: { isPrivate: boolean }) {
  const isSingedIn = false

  if (!isSingedIn && props.isPrivate) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}
