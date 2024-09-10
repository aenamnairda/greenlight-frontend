import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export const config = {
  site: {
    name: 'Greenlight',
    description: '',
    colorScheme: 'light',
    themeColor: '#0e0f11',
    primaryColor: 'purple',
    url: getSiteURL(),
  },
  logLevel: import.meta.env.VITE_LOG_LEVEL || LogLevel.ALL,
  gtm: {
    id: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID,
  },
};
