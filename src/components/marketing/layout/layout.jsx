import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';

import { Footer } from '@/components/marketing/layout/footer';
import { MainNav } from '@/components/marketing/layout/main-nav';

export function Layout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-zIndex': 1000,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            // Fix Safari trackpad/gesture overscroll color
            backgroundColor: 'var(--joy-palette-neutral-950)',
          },
        }}
      />
      <Box sx={{ bgcolor: 'var(--joy-palette-background-body)' }}>
        <MainNav />
        {children}
        <Footer />
      </Box>
    </React.Fragment>
  );
}
