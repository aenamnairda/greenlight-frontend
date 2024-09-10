'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { moviesClient } from '@/lib/movies/client';
import { RouterLink } from '@/components/core/link';

const schema = zod.object({
  genres: zod.string(),
  runtime: zod.string().min(1, { message: 'Runtime is required' }),
  title: zod.string().min(1, { message: 'Title is required' }),
  year: zod.number().min(0, 'Width must be greater than or equal to 0').nullable(),
});

const defaultValues = {
  title: 'The Vampires Diares',
  year: 1990,
  runtime: '120 mins',
};

export function MovieCreateForm() {
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      const genresArray = values.genres.split(',');
      const trimmedGenresArray = genresArray.map((string) => string.trim());
      values.genres = trimmedGenresArray;

      const errorData = await moviesClient.createMovie(values);
      const { error } = errorData || '';

      if (error) {
        setIsPending(false);

        if (error.genres) {
          setError('genres', {
            type: 'server',
            message: error.genres.charAt(0).toUpperCase() + error.genres.slice(1),
          });
        } else if (error.year) {
          setError('year', {
            type: 'server',
            message: error.year.charAt(0).toUpperCase() + error.year.slice(1),
          });
        } else {
          setError('root', {
            type: 'server',
            message: 'Something went wrong with the server',
          });
        }
        return;
      }

      toast.success('Movie created');

      navigate(paths['dashboard.movies']);
    },
    [navigate, setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={12}>{errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}</Grid>
              <Grid md={6} xs={12}>
                <FormControl color={errors.title ? 'danger' : undefined}>
                  <FormLabel>Title</FormLabel>
                  <Input {...register('title')} />
                  {errors.title ? <FormHelperText>{errors.title.message}</FormHelperText> : null}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.year)}>
                      <FormLabel>Year</FormLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange(null);
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        type="number"
                        value={field.value ?? ''}
                      />
                      {errors.year ? <FormHelperText>{errors.year.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl color={errors.runtime ? 'danger' : undefined}>
                  <FormLabel>Runtime</FormLabel>
                  <Input {...register('runtime')} />
                  {errors.runtime ? <FormHelperText>{errors.runtime.message}</FormHelperText> : null}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl color={errors.genres ? 'danger' : undefined}>
                  <FormLabel>Genres</FormLabel>
                  <Input {...register('genres')} />
                  {errors.genres ? <FormHelperText>{errors.genres.message}</FormHelperText> : null}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.movies']} variant="outlined">
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Create Movie
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
