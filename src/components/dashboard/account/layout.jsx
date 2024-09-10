import * as React from 'react';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { AccountTabs } from '@/components/dashboard/account/account-tabs';

export function Layout({ children }) {
  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
            Settings
          </Typography>
          <AccountTabs />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
