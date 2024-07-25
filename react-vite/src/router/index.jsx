import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: '*',
        element: <h1>404 page not found</h1>
      }
    ],
  },
]);
