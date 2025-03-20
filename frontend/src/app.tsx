import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'

import { AuthProvider } from './app/providers/auth-provider'
import { TanstackQueryProvider } from './app/providers/tanstack-query-provider'
import { router } from './routes/routes'

export function App() {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </TanstackQueryProvider>
  )
}
