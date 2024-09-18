/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
const Administration = lazy(() => import('../components/Administration'));
const LessonDetails = lazy(() => import('../components/LessonDetails'));
const CourseDetails = lazy(() => import('../components/CourseDetails'));
const LessonForm = lazy(() => import('../components/LessonForm'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const Settings = lazy(() => import('../components/Settings'));
const Courses = lazy(() => import('../components/Courses'));
const Account = lazy(() => import('../components/Account'));
const Grades = lazy(() => import('../components/Grades'));
import { createBrowserRouter } from 'react-router-dom';
import Construction from '../components/Construction';
import LandingPage from '../components/LandingPage';
import Layout from './Layout';

const Loading = () => <div>Loading...</div>;

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
        element: (
          <Suspense fallback={<Loading />}>
            <Administration />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Loading />}>
                <Courses />
              </Suspense>
            ),
          },
          {
            path: ':courseId',
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseDetails />
                  </Suspense>
                ),
              },
              {
                path: 'lessons',
                children: [
                  {
                    path: 'new',
                    element: (
                      <Suspense fallback={<Loading />}>
                        <LessonForm />
                      </Suspense>
                    ),
                  },
                  {
                    path: ':lessonId/edit',
                    element: (
                      <Suspense fallback={<Loading />}>
                        <LessonForm edit={true} />
                      </Suspense>
                    ),
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        path: 'lessons/:lessonId',
        element: (
          <Suspense fallback={<Loading />}>
            <LessonDetails />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<Loading />}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: 'grades',
        element: (
          <Suspense fallback={<Loading />}>
            <Grades />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        ),
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
