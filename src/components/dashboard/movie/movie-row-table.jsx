import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';

import { RouterLink } from '@/components/core/link';

export function MovieTableRow({ row, onMovieDelete }) {
  const handleMovieDelete = () => {
    onMovieDelete(row.id);
  };

  return (
    <tr key={row.id}>
      <td>
        <Link component={RouterLink} href={`/dashboard/movies/${row.id}`}>
          {row.id}
        </Link>
      </td>
      <td>{row.title}</td>
      <td>{row.year}</td>
      <td>{row.runtime}</td>
      <td>{row.genres}</td>
      <td>
        <Stack direction="row">
          <Button color="danger" onClick={handleMovieDelete} size="sm" variant="plain">
            Delete
          </Button>
        </Stack>
      </td>
    </tr>
  );
}
