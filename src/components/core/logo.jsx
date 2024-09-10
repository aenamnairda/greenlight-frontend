'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import { useColorScheme } from '@mui/joy/styles';

import { NoSSR } from '@/components/core/no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

export function Logo({ color = 'dark', height = HEIGHT, width = WIDTH }) {
  const url = color === 'light' ? '/assets/logo.svg' : '/assets/logo--dark.svg';

  return <img alt="logo" height={height} src={url} width={width} />;
}

export function DynamicLogo({ colorDark = 'light', colorLight = 'dark', height = HEIGHT, width = WIDTH, ...props }) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSSR fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSSR>
  );
}
