import { createBrowserRouter } from 'react-router'
import { Home } from '@views/Home'
import { BaseLayout } from '@/views/layouts/BaseLayout'
import type { RouteObject } from 'react-router'
import { FormIndex } from '@/views/Form/Index'
import { FormShow } from '@/views/Form/Show'
import { FormCreate } from '@/views/Form/Create'
import { FormUpdate } from '@/views/Form/Update'

const routes = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/form',
        element: <FormIndex />,
      },
      {
        path: '/form/:id',
        element: <FormShow />,
      },
      {
        path: '/form/create',
        element: <FormCreate />,
      },
      {
        path: '/form/:id/edit',
        element: <FormUpdate />,
      },
    ],
  },
] satisfies RouteObject[]

export const router = createBrowserRouter(routes)
