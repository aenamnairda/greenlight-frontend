import * as React from 'react';
import { Typography } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { CenteredLayout } from '@/components/auth/centered-layout';
import { VerifyEmailForm } from '@/components/auth/custom/verify-email-form';

const metadata = {
  title: `Verify Email | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <CenteredLayout>
        <Stack spacing={3}>
          <Typography level="h4" lineHeight="48px" textAlign="center" textColor="inherit">
            Verify email address
          </Typography>
          <VerifyEmailForm />
        </Stack>
      </CenteredLayout>
    </React.Fragment>
  );
}
