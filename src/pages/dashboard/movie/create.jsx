import * as React from 'react';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { MovieCreateForm } from '@/components/dashboard/movie/create-movie-form';

const metadata = {
  title: `Add | Movies | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={5}>
            <Stack direction={{ sm: 'row', md: 'column' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                  Add a Movie
                </Typography>
              </Stack>
            </Stack>
            <MovieCreateForm />
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
