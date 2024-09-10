'use client';

import * as React from 'react';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);
  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error || !user) {
      localStorage.removeItem('authToken');
      logger.debug('[AuthGuard]: Auth token invalid or expired, redirecting to sign in');
      navigate(paths['auth.custom.sign-in']);
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
