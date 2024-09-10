'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Full name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(8, { message: 'Password should be at least 6 characters' }),
});

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

export function SignUpForm() {
  const navigate = useNavigate();
  const { checkSession } = useUser();
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

      const { error } = await authClient.signUp(values);

      if (error) {
        Object.keys(error).forEach((key) => {
          setError(key, {
            type: 'server',
            message: error[key],
          });
        });

        setIsPending(false);
        return;
      }

      await checkSession();

      navigate('/auth/custom/account-created');
    },
    [navigate, setError, checkSession]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <FormControl color={errors.name ? 'danger' : undefined}>
            <FormLabel>Full Name</FormLabel>
            <Input {...register('name')} />
            {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.email ? 'danger' : undefined}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" {...register('email')} />
            {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.password ? 'danger' : undefined}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password')} />
            {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
          </FormControl>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit">
            Create Account
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
