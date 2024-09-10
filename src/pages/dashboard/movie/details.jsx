import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Container from '@mui/joy/Container';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { config } from '@/config';
import { moviesClient } from '@/lib/movies/client';

const metadata = {
  title: `Add | Movies | Dashboard | ${config.site.name}`,
};

export function Page() {
  const location = useLocation();
  const [movie, setMovie] = React.useState({});
  const [movieId, setMovieId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    setError,
    formState: { errors },
  } = useForm();

  const fetchMovie = React.useCallback(
    async (movieId) => {
      setIsLoading(true);
      const { data, error } = await moviesClient.getMovieById(movieId);

      if (error) {
        if (error.response && error.response.status === 404) {
          setError('root', {
            type: 'server',
            message: 'Movie not found',
          });
        } else {
          setError('root', {
            type: 'server',
            message: 'Something went wrong',
          });
        }
      } else {
        const { movie } = data;
        setMovie(movie);
      }

      setIsLoading(false);
    },
    [setError]
  );

  React.useEffect(() => {
    const pathname = location.pathname;
    const movieId = pathname.split('/')[3];
    setMovieId(movieId);
    fetchMovie(movieId);
  }, [fetchMovie, movieId, location.pathname]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Grid md={12}>
            {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
            {!movie && !isLoading && <Alert color="warning">No movies found.</Alert>}
          </Grid>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={5}>
              {movie ? (
                <Stack direction={{ sm: 'row', md: 'column' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                      Movie Details
                    </Typography>
                  </Stack>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    divider={<Divider orientation="vertical" />}
                    spacing={{ xs: 2, md: 3 }}
                  >
                    <Stack spacing={1}>
                      <Typography level="body-sm">ID</Typography>
                      <Typography>{movie.id}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography level="body-sm">Title</Typography>
                      <Typography>{movie.title}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography level="body-sm">Runtime</Typography>
                      <Typography>{movie.runtime}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography level="body-sm">Genres</Typography>
                      <Typography>
                        {movie.genres.map((item) => {
                          return (
                            <Box component="span" key={item} sx={{ mr: 1 }}>
                              {item}
                            </Box>
                          );
                        })}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ) : null}
            </Stack>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
}
