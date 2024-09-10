import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Page as CustomAccountCreated } from '@/pages/auth/custom/account-created';
import { Page as CustomAuthResetPasswordPage } from '@/pages/auth/custom/reset-password';
import { Page as CustomAuthSignInPage } from '@/pages/auth/custom/sign-in';
import { Page as CustomAuthSignUpPage } from '@/pages/auth/custom/sign-up';
import { Page as CustomAuthVerifyEmail } from '@/pages/auth/custom/verify-email';
import { GuestGuard } from '@/components/auth/guest-guard';

export const routes = [
  {
    path: 'auth/custom',
    element: <Outlet />,
    children: [
      {
        path: 'reset-password',
        element: (
          <GuestGuard>
            <CustomAuthResetPasswordPage />
          </GuestGuard>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <GuestGuard>
            <CustomAuthSignInPage />
          </GuestGuard>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <GuestGuard>
            <CustomAuthSignUpPage />
          </GuestGuard>
        ),
      },
      {
        path: 'verify-email',
        element: (
          <GuestGuard>
            <CustomAuthVerifyEmail />
          </GuestGuard>
        ),
      },
      {
        path: 'account-created',
        element: (
          <GuestGuard>
            <CustomAccountCreated />
          </GuestGuard>
        ),
      },
    ],
  },
];
