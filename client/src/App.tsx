import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorPage } from './pages/ErrorPage';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Profile } from './pages/Profile';
import { setError, useAppDispatch } from './store';
import { getProfileThunkAction } from './store/reducers/auth_reducer';


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

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(getProfileThunkAction());
      dispatch(setError(null));
    }
    getProfile();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;