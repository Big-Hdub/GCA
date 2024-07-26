import { createBrowserRouter } from 'react-router-dom';
import Construction from '../components/Construction';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import Courses from '../components/Courses';
import Account from '../components/Account';
import Grades from '../components/Grades';
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
        path: 'courses',
        element: <Courses main={true} />
      },
      {
        path: 'account',
        element: <Account main={true} />
      },
      {
        path: 'grades',
        element: <Grades main={true} />
      },
      {
        path: 'settings',
        element: <Settings main={true} />
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
