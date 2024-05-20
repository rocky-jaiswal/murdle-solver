import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '/@/pages/ErrorPage'

type Route = {
  label: string
  path: string
  element: Promise<React.FC>
}

export const routes: Route[] = [
  {
    label: 'Home',
    path: '/home',
    element: import('./pages/HomePage').then(({ HomePage }) => HomePage),
  },
  {
    label: 'About',
    path: '/about',
    element: import('./pages/AboutPage').then(({ AboutPage }) => AboutPage),
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('/@/layout').then(({ Layout }) => ({ Component: Layout })),
    errorElement: <ErrorPage />,
    children: routes.map((route) => ({
      path: route.path,
      lazy: () => route.element.then((Component) => ({ Component })),
    })),
  },
])

export const Router = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div>
          <h1>Loading...</h1>
        </div>
      }
    />
  )
}
