'use client';

import * as React from 'react';

import { authClient } from '@/lib/auth/custom/client';
import { logger } from '@/lib/default-logger';

export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
  const [state, setState] = React.useState({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async () => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Invalid or expired token', isLoading: false }));
        return;
      }

      if (data) {
        setState((prev) => ({ ...prev, user: data, error: null }));
      }
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Invalid or expired token' }));
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      await checkSession().catch(() => {
        // noop
      });
      setState((prev) => ({ ...prev, isLoading: false }));
    })().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        checkSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
