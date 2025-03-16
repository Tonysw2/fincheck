import { createBrowserRouter, Navigate } from 'react-router'

import { AuthLayout } from '../view/layouts/auth-layout'
import { Dashboard } from '../view/pages/dashboard'
import { SignIn } from '../view/pages/sign-in'
import { SignUp } from '../view/pages/sign-up'
import { AuthGuard } from './auth-guard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard isPrivate />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthGuard isPrivate={false} />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
        ],
      },
    ],
  },
])
