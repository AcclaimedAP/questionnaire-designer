import { createBrowserRouter } from 'react-router'
import { Home } from '@views/Home'
import { BaseLayout } from '@components/layout/BaseLayout'
import type { RouteObject } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
] satisfies RouteObject[])
