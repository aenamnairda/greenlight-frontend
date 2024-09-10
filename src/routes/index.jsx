import * as React from 'react';

import { Page as NotFoundPage } from '@/pages/not-found';

import { routes as authRoutes } from './auth';
import { routes as dashboardRoutes } from './dashboard';
import { routes as marketingRoutes } from './marketing';

export const routes = [
  ...marketingRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
