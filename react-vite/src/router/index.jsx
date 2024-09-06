import Administration from '../components/Administration';
import LessonDetails from '../components/LessonDetails';
import CourseDetails from '../components/CourseDetails';
import { createBrowserRouter } from 'react-router-dom';
import Construction from '../components/Construction';
import LandingPage from '../components/LandingPage';
import LessonForm from '../components/LessonForm';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import Courses from '../components/Courses';
import Account from '../components/Account';
import Grades from '../components/Grades';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'administration',
        element: <Administration main={true} />
      },
      {
        path: 'dashboard',
        element: <Dashboard main={true} />
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            element: <Courses main={true} />,
          },
          {
            path: ':courseId',
            children: [
              {
                path: '',
                element: <CourseDetails />
              },
              {
                path: 'lessons',
                children: [
                  {
                    path: 'new',
                    element: <LessonForm />
                  },
                  {
                    path: ':lessonId/edit',
                    element: <LessonForm edit={true} />
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        path: 'lessons/:lessonId',
        element: <LessonDetails />
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
        element: <Construction error='404 Page not found' />
      }
    ],
  },
]);
