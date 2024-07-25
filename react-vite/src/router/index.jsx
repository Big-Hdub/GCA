import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Layout from './Layout';
import Construction from '../components/Construction';
import Dashboard from '../components/Dashboard';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard main={true} />
      },
      {
        path: 'about',
        element: <Construction />
      },
      {
        path: 'team',
        element: <Construction />
      },
      {
        path: 'help',
        element: <Construction />
      },
      {
        path: 'contact',
        element: <Construction />
      },
      {
        path: '*',
        element: <h1>404 page not found</h1>
      }
    ],
  },
]);
