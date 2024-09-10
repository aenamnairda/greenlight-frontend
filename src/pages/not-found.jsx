import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { paths } from '@/paths';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';

export function Page() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        py: '100px',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Box
            sx={{
              height: {
                xs: '200px',
                md: '300px',
              },
              position: 'relative',
            }}
          >
            <Image alt="not found" fill src="/assets/not-found.svg" />
          </Box>
          <Typography fontSize="56px" fontWeight="lg" textAlign="center" textColor="text.primary">
            Not Found.
          </Typography>
          <Typography fontSize="xl" textAlign="center" textColor="text.tertiary">
            The page you are trying to access cannot be found or may have been relocated. Kindly return to the homepage.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button component={RouterLink} href={paths['home']} size="lg">
              Go back home
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
