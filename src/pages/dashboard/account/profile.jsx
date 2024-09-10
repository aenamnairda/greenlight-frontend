import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { getInitials } from '@/lib/get-initials';
import { useUser } from '@/hooks/use-user';

const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};

export function Page() {
  const { user } = useUser();
  const userInfo = user.user;

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
            <Avatar>{getInitials(`${userInfo.name}`)}</Avatar>
            <Box
              sx={{
                alignItems: 'center',
                borderRadius: '100%',
                color: 'var(--joy-palette-common-white)',
                cursor: 'pointer',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                },
                '&:not(:hover) > *': {
                  display: 'none',
                },
              }}
            >
              <PenIcon style={{ fontSize: 'var(--joy-fontSize-lg)' }} weight="bold" />
            </Box>
          </Box>
          <div>
            <Typography level="h4">Profile Picture</Typography>
            <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
          </div>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Basic details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input defaultValue={userInfo.name} name="fullName" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input defaultValue={userInfo.email} name="email" type="email" />
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" variant="outlined">
            Discard
          </Button>
          <Button>Save Changes</Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
