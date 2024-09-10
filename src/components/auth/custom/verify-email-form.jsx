'use client';

import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';

export function VerifyEmailForm() {
  const [searchParams] = useSearchParams();
  const [tokenVerified, setTokenVerified] = React.useState(false);
  const {
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get('token');
    if (!token) {
      setError('root', {
        type: 'server',
        message: 'No token available',
      });
      return;
    }

    const { error } = await authClient.verifyEmail(token);
    if (error) {
      setError('root', {
        type: 'server',
        message: error.token,
      });
      return;
    }
    setTokenVerified(true);
    toast.success('Email verified!');
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {!tokenVerified ? (
            <Button fullWidth type="submit">
              Verify Email
            </Button>
          ) : null}
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          {tokenVerified ? (
            <>
              <Alert color="success">Email verified!</Alert>
              <Button color="success" component="a" fullWidth href={paths['auth.custom.sign-in']}>
                Sign in
              </Button>
            </>
          ) : null}
        </Stack>
      </Stack>
    </form>
  );
}
