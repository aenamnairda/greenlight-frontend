'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod
    .string()
    .min(1, { message: 'Password must be provided' })
    .min(8, { message: 'Password must be longer than 8 characters' }),
});

const defaultValues = {
  email: 'adi01@gmail.com',
  password: 'Pass123@',
};

export function SignInForm() {
  const navigate = useNavigate();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = React.useState();
  const [isPending, setIsPending] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      const error = await authClient.signInWithPassword(values);

      if (error) {
        setIsPending(false);

        if (error.error) {
          setError('root', {
            type: 'server',
            message: error.error.charAt(0).toUpperCase() + error.error.slice(1),
          });
        } else {
          setError('root', {
            type: 'server',
            message: 'Something went wrong with the server',
          });
          return;
        }
        return;
      }

      await checkSession();

      navigate('/dashboard');
    },
    [navigate, setError, checkSession]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Divider>or</Divider>
        <Stack spacing={2}>
          <FormControl color={errors.email ? 'danger' : undefined}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" {...register('email')} />
            {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.password ? 'danger' : undefined}>
            <FormLabel>Password</FormLabel>
            <Input
              endDecorator={
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeSlashIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                  ) : (
                    <EyeIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                  )}
                </IconButton>
              }
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
          </FormControl>
          <div>
            <Link component={RouterLink} href={paths['auth.custom.reset-password']}>
              Fogot password?
            </Link>
          </div>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit">
            Sign In
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
