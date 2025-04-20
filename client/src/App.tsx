import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorPage } from './pages/ErrorPage';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  }
])

const App: React.FC = ()  => {
  return <RouterProvider router={ router }/>
}

export default App