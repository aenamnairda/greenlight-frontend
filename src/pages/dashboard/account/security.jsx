import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';

const metadata = {
  title: `Security | Account | Dashboard | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Change Password</Typography>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl>
              <FormLabel>Current password</FormLabel>
              <Input defaultValue="" name="password" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>New password</FormLabel>
              <Input defaultValue="" name="newPassword" type="password" />
              <FormHelperText>Your new password must be more than 8 characters.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Confirm new password</FormLabel>
              <Input defaultValue="" name="passwordConfirm" type="password" />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button color="neutral" variant="outlined">
              Discard
            </Button>
            <Button>Save Changes</Button>
          </Stack>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
