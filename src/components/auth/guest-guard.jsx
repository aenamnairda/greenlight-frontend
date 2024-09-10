'use client';

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export function GuestGuard({ children }) {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error || localStorage.getItem('auth-token')) {
      setIsChecking(false);
      localStorage.removeItem('auth-token');
      return;
    }

    if (user) {
      logger.debug('[GuestGuard]: User is logged in, redirecting to dashboard');
      navigate(paths['dashboard']);
      return;
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
    toast.error(error);
  }

  return <React.Fragment>{children}</React.Fragment>;
}
