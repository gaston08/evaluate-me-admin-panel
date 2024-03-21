import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { Create } from 'app/pages/exam';
import { SignIn } from 'app/pages/auth';

import { RequireAuth, NoRequireAuth } from 'app/layouts/auth';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/admin/',
    errorElement: <Error />,
    element: <RequireAuth />,
    children: [
      {
        path: '/admin/exam/create',
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
