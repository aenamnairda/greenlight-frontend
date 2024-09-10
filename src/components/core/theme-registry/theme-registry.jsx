'use client';

import * as React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';

import { createTheme } from '@/styles/theme';

export function ThemeRegistry({ children, colorScheme, primaryColor }) {
  const theme = createTheme(primaryColor);

  return (
    <CssVarsProvider defaultColorScheme={colorScheme} theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
