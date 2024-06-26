import { createBrowserRouter, Navigate } from 'react-router-dom';
import Error from 'app/pages/error';
import { Create, Update } from 'app/pages/exam';
import { SignIn } from 'app/pages/auth';
import Users from 'app/pages/admin/Users';
import CreateUser from 'app/pages/admin/CreateUser';
import Dashboard from 'app/pages/admin/Dashboard';

import { RequireAuthAdmin, NoRequireAuth } from 'app/layouts/auth';
import { AdminLayout } from 'app/layouts/admin';

export const arrRoutes = [
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/admin',
    element: <RequireAuthAdmin />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: '/admin/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/admin/users',
            element: <Users />,
          },
          {
            path: '/admin/users/create',
            element: <CreateUser />,
          },
        ],
      },
    ],
  },
  {
    path: '/temp/',
    errorElement: <Error />,
    element: <RequireAuthAdmin />,
    children: [
      {
        path: '/temp/exam/create',
        element: <Create />,
      },
      {
        path: '/temp/exam/update/:id',
        element: <Update />,
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
