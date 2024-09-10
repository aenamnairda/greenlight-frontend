'use client';

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { getInitials } from '@/lib/get-initials';
import { usePopover } from '@/hooks/use-popover';
import { useUser } from '@/hooks/use-user';

import { MobileNav } from './mobile-nav';
import { NotificationsPopover } from './notifications-popover';
import { UserPopover } from './user-popover';

export function MainNav({ items }) {
  const [openNav, setOpenNav] = React.useState(false);
  const notificationsPopover = usePopover();
  const userPopover = usePopover();
  const { user } = useUser();
  const userInfo = user.user;

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: 'var(--Layout-background)',
          left: 0,
          position: 'sticky',
          pt: {
            lg: 'var(--Layout-gap)',
          },
          top: 0,
          width: '100%',
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Box
          sx={{
            bgcolor: 'var(--LayoutContent-background)',
            borderBottom: '1px solid var(--joy-palette-divider)',
            borderRadius: {
              lg: 'var(--LayoutContent-radius) var(--LayoutContent-radius) 0 0',
            },
            boxShadow: 'rgba(0, 0, 0, 0.06) 0px 12px 40px -12px',
            display: 'flex',
            flexGrow: 1,
            minHeight: 'var(--MainNav-height, 72px)',
            px: {
              xs: 2,
              lg: 3,
            },
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexGrow: 1 }}>
            <IconButton
              color="neutral"
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{
                display: {
                  lg: 'none',
                },
              }}
              variant="plain"
            >
              <ListIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Badge
              color="danger"
              sx={{
                '& .MuiBadge-badge': {
                  top: '6px',
                  right: '6px',
                },
              }}
            >
              <IconButton
                color="neutral"
                onClick={notificationsPopover.handleOpen}
                ref={notificationsPopover.anchorRef}
                variant="plain"
              >
                <BellIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
              </IconButton>
            </Badge>
            <Badge
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              color="success"
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                '& .MuiBadge-badge': {
                  bottom: '4px',
                  right: '4px',
                },
              }}
            >
              <Avatar>{getInitials(`${userInfo.name}`)}</Avatar>
            </Badge>
          </Stack>
        </Box>
      </Box>
      <MobileNav
        items={items}
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
      <NotificationsPopover
        anchorEl={notificationsPopover.anchorRef.current}
        onClose={notificationsPopover.handleClose}
        open={notificationsPopover.open}
      />
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
    </React.Fragment>
  );
}
