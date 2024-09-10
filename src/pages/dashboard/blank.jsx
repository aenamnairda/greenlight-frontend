import * as React from 'react';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';

const metadata = {
  title: `Blank | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={3}>
            <div>
              <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                Blank
              </Typography>
            </div>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
