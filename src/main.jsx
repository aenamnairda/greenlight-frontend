import * as React from 'react';
import { App } from '@/app';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <React.Suspense>
          <App />
        </React.Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
