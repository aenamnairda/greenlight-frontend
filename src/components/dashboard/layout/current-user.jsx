'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';

import { paths } from '@/paths';
import { getInitials } from '@/lib/get-initials';
import { RouterLink } from '@/components/core/link';

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Rene',
  lastName: 'Wells',
  email: 'rene@devias.io',
  plan: 'starter',
};

const planMapping = {
  basic: {
    label: 'Basic',
    color: 'neutral',
  },
  starter: {
    label: 'Starter',
    color: 'success',
  },
  pro: {
    label: 'Pro',
    color: 'primary',
  },
};

export function CurrentUser({ onNavigate }) {
  const plan = planMapping[user.plan] ?? {
    label: 'Unknown',
    color: 'neutral',
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--joy-palette-neutral-900)',
        borderRadius: 'var(--joy-radius-md)',
        color: 'var(--joy-palette-common-white)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Badge
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          color="success"
          sx={{
            '--Badge-ringColor': 'var(--joy-palette-neutral-900)',
            '& .MuiBadge-badge': {
              bottom: '4px',
              right: '4px',
            },
          }}
        >
          <Avatar src={user.avatar}>{getInitials(`${user.firstName} ${user.lastName}`)}</Avatar>
        </Badge>
        <Box sx={{ flexGrow: 1 }}>
          <Typography fontWeight="lg" textColor="inherit">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography level="body-xs" textColor="neutral.500">
            {user.email}
          </Typography>
        </Box>
        <Chip color={plan.color} size="sm" variant="soft">
          {plan.label}
        </Chip>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          {user.plan === 'starter' ? (
            <Button
              color="neutral"
              component={RouterLink}
              href={paths['dashboard.account.billing']}
              onClick={onNavigate}
              size="sm"
              startDecorator={<LightningIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />}
              sx={{
                borderColor: 'var(--joy-palette-neutral-700)',
                color: 'var(--joy-palette-common-white)',
                width: '100%',
                '&:hover': {
                  bgcolor: 'var(--joy-palette-neutral-900)',
                },
              }}
              variant="outlined"
            >
              Upgrade to Pro
            </Button>
          ) : null}
        </Box>
        <IconButton
          color="neutral"
          component={RouterLink}
          href={paths['dashboard.account']}
          onClick={onNavigate}
          size="sm"
          sx={{
            borderColor: 'var(--joy-palette-neutral-700)',
            color: 'var(--joy-palette-common-white)',
            '&:hover': {
              bgcolor: 'var(--joy-palette-neutral-900)',
            },
          }}
          variant="outlined"
        >
          <GearSixIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
        </IconButton>
      </Stack>
    </Box>
  );
}
