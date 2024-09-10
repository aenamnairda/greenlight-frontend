import * as React from 'react';
import { Typography } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { CenteredLayout } from '@/components/auth/centered-layout';

const metadata = {
  title: `Account created | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <CenteredLayout>
        <Stack alignItems="center" spacing={3}>
          <Avatar color="success" variant="soft">
            <CheckIcon />
          </Avatar>
          <Typography level="h4" lineHeight="48px" textAlign="center" textColor="inherit">
            Check your email for confirmation!
          </Typography>
        </Stack>
      </CenteredLayout>
    </React.Fragment>
  );
}
