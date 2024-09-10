import * as React from 'react';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

import { config } from '@/config';
import { paths } from '@/paths';
import { moviesClient } from '@/lib/movies/client';
import { RouterLink } from '@/components/core/link';
import { MoviesTable } from '@/components/dashboard/movie/movies-table';

const metadata = {
  title: `Movies | Dashboard | ${config.site.name}`,
};

export function Page() {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const showSuccessToast = () => {
    toast.success('Movie successfully deleted');
  };

  const fetchMovies = React.useCallback(async () => {
    const { data, error } = await moviesClient.getMovies(page);

    if (error) {
      toast.error(error.error);
      return;
    }
    setMovies(data.movies);
  }, [page]);

  const handleMovieDelete = React.useCallback(
    async (id) => {
      const error = await moviesClient.deleteMovie(id);

      if (error) {
        toast.error(error.error.charAt(0).toUpperCase() + error.error.slice(1));
        return;
      }
      fetchMovies();
      showSuccessToast();
    },
    [fetchMovies]
  );

  React.useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Stack spacing={3}>
            <Stack direction={{ sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography fontSize={{ xs: 'xl3', lg: 'xl4' }} level="h1">
                  Movies
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Button
                  component={RouterLink}
                  href={paths['dashboard.movies.create']}
                  startDecorator={<PlusIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
                >
                  Create
                </Button>
              </Stack>
            </Stack>

            {movies.length === 0 ? (
              <Typography variant="body1">No movies found.</Typography>
            ) : (
              <Stack spacing={2}>
                <MoviesTable onMovieDelete={handleMovieDelete} rows={movies} />
              </Stack>
            )}
            <Stack direction="row" spacing={2}>
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button disabled={movies.length === 0} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </Stack>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
