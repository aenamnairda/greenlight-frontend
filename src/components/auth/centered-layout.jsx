import * as React from 'react';
import Box from '@mui/joy/Box';

export function CenteredLayout({ children }) {
  return (
    <Box
      sx={{
        bgcolor: 'var(--joy-palette-background-level1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'var(--joy-palette-background-level1)',
          borderRadius: 'var(--joy-radius-xl)',
          color: 'var(--joy-palette-text-primary)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
