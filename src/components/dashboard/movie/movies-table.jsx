'use client';

import * as React from 'react';
import Table from '@mui/joy/Table';

import { MovieTableRow } from './movie-row-table';

const columns = [
  {
    field: 'id',
    name: 'Customer ID',
  },
  {
    field: 'title',
    name: 'Title',
  },
  {
    field: 'year',
    name: 'Year',
  },
  {
    field: 'runtime',
    name: 'Runtime',
  },
  {
    field: 'genres',
    name: 'Genres',
  },
  {
    name: 'Actions',
    hideName: true,
    width: '100px',
  },
];

export function MoviesTable({ onMovieDelete, rows }) {
  return (
    <Table borderAxis="header" stripe="even">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              style={{
                width: column.width,
                minWidth: column.width,
                maxWidth: column.width,
                ...(column.align && {
                  textAlign: column.align,
                }),
              }}
            >
              {column.hideName ? null : column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <MovieTableRow key={row.id} onMovieDelete={onMovieDelete} row={row} />
        ))}
      </tbody>
    </Table>
  );
}
