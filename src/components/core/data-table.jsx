'use client';

import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Table from '@mui/joy/Table';

export function DataTable({ columns, onSelectOne, onSelectAll, rows, selectable, uniqueRowId, ...props }) {
  return (
    <Table borderAxis="header" {...props}>
      <thead>
        <tr>
          {selectable ? (
            <th style={{ width: '40px', minWidth: '40px', maxWidth: '40px' }}>
              <Checkbox onChange={onSelectAll} sx={{ verticalAlign: 'sub' }} />
            </th>
          ) : null}
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
        {rows.map((row, index) => (
          <tr key={row.id ? row.id : uniqueRowId?.(row) ?? index}>
            {selectable ? (
              <td>
                <Checkbox onChange={(event) => onSelectOne?.(event, row)} />
              </td>
            ) : null}
            {columns.map((column) => (
              <td
                key={column.name}
                style={{
                  ...(column.align && {
                    textAlign: column.align,
                  }),
                }}
              >
                {column.formatter ? column.formatter(row, index) : column.field ? row[column.field] : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
