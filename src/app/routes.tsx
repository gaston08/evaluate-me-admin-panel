import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { Create } from 'app/pages/exam';
import { SignIn } from 'app/pages/auth';
import Users from 'app/pages/admin/Users';

import { RequireAuth, NoRequireAuth } from 'app/layouts/auth';
import { AdminLayout } from 'app/layouts/admin';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/temp/',
    errorElement: <Error />,
    element: <RequireAuth />,
    children: [
      {
        path: '/temp/exam/create',
        element: <Create />,
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <Error />,
    element: <NoRequireAuth />,
    children: [
      {
        path: '/auth/login',
        element: <SignIn />,
      },
    ],
  },
];

export const router = createBrowserRouter(arrRoutes);
