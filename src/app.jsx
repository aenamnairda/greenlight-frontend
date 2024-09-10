'use client';

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoutes } from 'react-router-dom';

import '@/styles/global.css';

import { config } from '@/config';
import { routes } from '@/routes';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsConsumer, SettingsProvider } from '@/contexts/settings';
import { useInitialSettings } from '@/hooks/use-initial-settings';
import { Analytics } from '@/components/core/analytics';
import { NProgress } from '@/components/core/nprogress';
import { SettingsButton } from '@/components/core/settings-button';
import { ThemeRegistry } from '@/components/core/theme-registry';
import { Toaster } from '@/components/core/toaster';

const metadata = {
  title: config.site.name,
};

export function App() {
  const element = useRoutes(routes);
  const initialSettings = useInitialSettings();

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Analytics>
        <UserProvider>
          <SettingsProvider settings={initialSettings}>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeRegistry colorScheme={settings.colorScheme} primaryColor={settings.primaryColor}>
                  <Helmet>
                    <meta content={settings.colorScheme} name="color-scheme" />
                    <meta content={config.site.themeColor} name="theme-color" />
                  </Helmet>
                  {element}
                  <SettingsButton />
                  <Toaster position="bottom-right" />
                  <NProgress />
                </ThemeRegistry>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </UserProvider>
      </Analytics>
    </React.Fragment>
  );
}
