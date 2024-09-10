import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { layoutConfig } from '@/components/dashboard/layout/config';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';

const metadata = {
  title: `Dashboard | ${config.site.name}`,
};

export function Layout({ children }) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <GlobalStyles
        styles={{
          body: {
            '--Layout-background': 'var(--joy-palette-neutral-950)',
            '--Layout-gap': '24px',
            '--LayoutContent-background': 'var(--joy-palette-background-body)',
            '--LayoutContent-radius': 'var(--joy-radius-xl)',
            '--MainNav-height': '72px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '320px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            // Fix Safari trackpad/gesture overscroll color
            backgroundColor: 'var(--Layout-background)',
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--Layout-background)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '-webkit-fill-available',
          minHeight: '100vh',
        }}
      >
        <SideNav items={layoutConfig.navItems} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            pb: {
              lg: 'var(--Layout-gap)',
            },
            pl: {
              lg: 'var(--SideNav-width)',
            },
            pr: {
              lg: 'var(--Layout-gap)',
            },
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--LayoutContent-background)',
              borderBottomLeftRadius: {
                lg: 'var(--LayoutContent-radius)',
              },
              borderBottomRightRadius: {
                lg: 'var(--LayoutContent-radius)',
              },
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <MainNav items={layoutConfig.navItems} />
            {children}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
