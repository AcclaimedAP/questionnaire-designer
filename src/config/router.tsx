import { createBrowserRouter } from 'react-router'
import { Home } from '@views/Home'
import { BaseLayout } from '@/views/layouts/BaseLayout'
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
