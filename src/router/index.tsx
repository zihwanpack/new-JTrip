import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { HomePage } from '../pages/HomePage.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { NotFound } from '../pages/NotFound.tsx';
import { ProtectedLayout } from '../layouts/ProtectedLayout.tsx';
import { BaseLayout } from '../layouts/BaseLayout.tsx';
import { FullscreenLoader } from '../components/common/FullscreenLoader.tsx';
import { ErrorBoundary } from '../errors/ErrorBoundary.tsx';

const TripCreatePage = lazy(() => import('../pages/TripCreatePage.tsx').then((module) => ({ default: module.TripCreatePage })));
const TripDetailPage = lazy(() => import('../pages/TripDetailPage.tsx').then((module) => ({ default: module.TripDetailPage })));
const EventCreatePage = lazy(() => import('../pages/EventCreatePage.tsx').then((module) => ({ default: module.EventCreatePage })));
const EventDetailPage = lazy(() => import('../pages/EventDetailPage.tsx').then((module) => ({ default: module.EventDetailPage })));
const MyTripsPage = lazy(() => import('../pages/MyTripsPage.tsx').then((module) => ({ default: module.MyTripsPage })));
const Mypage = lazy(() => import('../pages/Mypage.tsx').then((module) => ({ default: module.Mypage })));
const TripEditPage = lazy(() => import('../pages/TripEditPage.tsx').then((module) => ({ default: module.TripEditPage })));
const EventEditPage = lazy(() => import('../pages/EventEditPage.tsx').then((module) => ({ default: module.EventEditPage })));



const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { 
        element: 
        <ErrorBoundary>
          <Suspense fallback={<FullscreenLoader />}>
            <BaseLayout />
          </Suspense>
        </ErrorBoundary>
        ,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'trips/new',
            element: <TripCreatePage />
          },
          {
            path: 'trips/:tripId/edit',
            element: <TripEditPage />
          },
          {
            path: 'trips/:tripId',
            element: <TripDetailPage />
          },
          {
            path: 'trips/:tripId/events/new',
            element: <EventCreatePage />
          },

          {
            path: 'trips/:tripId/events/:eventId/edit',
            element: <EventEditPage />
          },
          {
            path: 'trips/:tripId/events/:eventId',
            element: <EventDetailPage />
          },
          {
            path: 'my-trips',
            element: <MyTripsPage />
          },
          {
            path: 'mypage',
            element: <Mypage />
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
