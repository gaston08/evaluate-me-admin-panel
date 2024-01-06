// Imports
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
// To Test
import App from '../app/app';
import { arrRoutes } from '../app/routes';

vi.mock('axios');

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4ODczNjM5YTI2NTAxNGExNjQwNzUiLCJlbWFpbCI6Imdhc3RpQGdtYWlsLmNvbSIsInRva2VucyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDVUMjI6NDg6MjIuNjA4WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMDVUMjI6NDg6MjIuNjA4WiIsIl9fdiI6MCwiaWF0IjoxNzA0NDk0OTEwLCJleHAiOjE3MDQ3MTA5MTB9.otU8ll9U55MRwcCd_ghuw1VjQBQK__vlFK-5iJ6V4UI';

beforeEach(() => {});

afterEach(() => {});

const setupAuthPages = (initialRoute) => {
  const router = createMemoryRouter(arrRoutes, {
    initialEntries: [initialRoute],
    initialIndex: 0,
  });

  const { unmount } = render(<RouterProvider router={router} />);

  return { router, unmount };
};

// Tests
describe('App render', async () => {
  /*
  describe('/auth/login', async () => {
    it('should render SignIn page withtout after creation message', async () => {
      const { unmount } = render(
        <MemoryRouter
          initialEntries={[
            { pathname: '/auth/login', state: { signup: false } },
          ]}
        >
          <App />
        </MemoryRouter>
      );

      const loginText = await screen.queryByText(/Inicio de sesión/);
      const afterCreationMessage = await screen.queryByText(
        /Usuario creado con éxito/
      );

      unmount();

      expect(loginText).not.toBeNull();
      expect(afterCreationMessage).toBeNull();
    });

    it('should render SignIn page with after creation message', async () => {
      const { unmount } = render(
        <MemoryRouter
          initialEntries={[
            { pathname: '/auth/login', state: { signup: true } },
          ]}
        >
          <App />
        </MemoryRouter>
      );

      const loginText = await screen.queryByText(/Inicio de sesión/);
      const afterCreationMessage = await screen.queryByText(
        /Usuario creado con éxito/
      );

      unmount();

      expect(loginText).not.toBeNull();
      expect(afterCreationMessage).not.toBeNull();
    });
  });*/

  describe('testing redirect auth protection', async () => {
    it('should redirect to /blog/exam', async () => {
      axios.post.mockResolvedValue({
        data: { ok: true, test: true },
      });
      localStorage.setItem('access_token', access_token);
      const { router, unmount } = setupAuthPages('/auth/login');

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/blog/exam');
      });

      act(() => {
        router.navigate('/auth/signup');
      });

      await waitFor(() => {
        expect(router.state.location.pathname).toBe('/blog/exam');
      });
      unmount();
    });
  });
});
