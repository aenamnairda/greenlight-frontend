import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Layout as AccountLayout } from '@/components/dashboard/account/layout';
import { Layout as DashboardLayout } from '@/components/dashboard/layout';

// Account pages
const AccountProfilePage = React.lazy(() =>
  import('@/pages/dashboard/account/profile').then((m) => ({ default: m.Page }))
);
const AccountSecurityPage = React.lazy(() =>
  import('@/pages/dashboard/account/security').then((m) => ({ default: m.Page }))
);

// Other pages
const BlankPage = React.lazy(() => import('@/pages/dashboard/blank').then((m) => ({ default: m.Page })));
const MovieListPage = React.lazy(() => import('@/pages/dashboard/movie/list').then((m) => ({ default: m.Page })));
const MovieCreatePage = React.lazy(() => import('@/pages/dashboard/movie/create').then((m) => ({ default: m.Page })));
const MovieDetailsPage = React.lazy(() => import('@/pages/dashboard/movie/details').then((m) => ({ default: m.Page })));

export const routes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <BlankPage />,
      },
      {
        path: 'account',
        element: (
          <AccountLayout>
            <Outlet />
          </AccountLayout>
        ),
        children: [
          {
            index: true,
            element: <AccountProfilePage />,
          },
          {
            path: 'security',
            element: <AccountSecurityPage />,
          },
        ],
      },
      {
        path: 'blank',
        element: <BlankPage />,
      },
      {
        path: 'movies',
        children: [
          {
            index: true,
            element: <MovieListPage />,
          },
          {
            path: 'create',
            element: <MovieCreatePage />,
          },
          {
            path: ':movieId',
            element: <MovieDetailsPage />,
          },
        ],
      },
    ],
  },
];
