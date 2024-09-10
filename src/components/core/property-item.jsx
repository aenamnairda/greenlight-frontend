import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export function PropertyItem({ name, value }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr)' }}>
      <div>
        <Typography level="body-sm" textColor="text.secondary">
          {name}
        </Typography>
      </div>
      <div>
        {typeof value === 'string' ? (
          <Typography level="body-sm" textColor={value ? 'text.primary' : 'text.tertiary'}>
            {value || 'None'}
          </Typography>
        ) : (
          <React.Fragment>{value}</React.Fragment>
        )}
      </div>
    </Box>
  );
}
