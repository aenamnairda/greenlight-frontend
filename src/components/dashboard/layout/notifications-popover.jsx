'use client';

import * as React from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';

const notifications = [
  {
    id: 'EV-001',
    createdAt: dayjs().subtract(5, 'minute').valueOf(),
    read: false,
    type: 'follow',
    avatar: '/assets/avatar-3.png',
    username: 'ammar',
  },
  {
    id: 'EV-002',
    createdAt: dayjs().subtract(3, 'hours').valueOf(),
    read: false,
    type: 'mention',
    avatar: '/assets/avatar-1.png',
    username: 'zaid',
    preview: 'This looks great @rene. Lets start with the next step.',
  },
  {
    id: 'EV-003',
    createdAt: dayjs().subtract(2, 'days').valueOf(),
    read: true,
    type: 'project_invite',
    avatar: '/assets/avatar-4.png',
    username: 'wilkinson',
    project: 'Devias IO',
  },
];

const Popup = styled(Popper)({
  maxWidth: '500px',
  width: '100%',
  zIndex: 'var(--joy-zIndex-popup)',
});

export function NotificationsPopover({ anchorEl, onClose, open }) {
  return (
    <Popup anchorEl={anchorEl} disablePortal open={open} placement="bottom-end" role={undefined}>
      <ClickAwayListener onClickAway={() => onClose?.()}>
        <Sheet
          sx={{
            borderRadius: 'var(--joy-radius-lg)',
            boxShadow: 'var(--joy-shadow-md)',
            m: 3,
            p: 3,
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography level="h4">Notifications</Typography>
              <Button color="neutral" size="sm" variant="outlined">
                Mark as read
              </Button>
            </Stack>
            <Stack divider={<Divider />}>
              {notifications.map((notification) => (
                <Stack direction="row" key={notification.id} spacing={2} sx={{ p: 2 }}>
                  <Avatar src={notification.avatar} />
                  <NotificationContent notification={notification} />
                  {!notification.read ? (
                    <Box
                      sx={{
                        bgcolor: 'var(--joy-palette-primary-solidBg)',
                        borderRadius: '50%',
                        flexGrow: 0,
                        flexShrink: 0,
                        height: '6px',
                        mt: '3px',
                        width: '6px',
                      }}
                    />
                  ) : null}
                </Stack>
              ))}
            </Stack>
            <Stack sx={{ alignItems: 'center' }}>
              <Button color="neutral" variant="plain">
                View all
              </Button>
            </Stack>
          </Stack>
        </Sheet>
      </ClickAwayListener>
    </Popup>
  );
}

function NotificationContent({ notification }) {
  if (notification.type === 'follow') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontSize="sm">
          <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
            @{notification.username}
          </Typography>{' '}
          started following you
        </Typography>
        <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd hh:mm A')}</Typography>
      </Box>
    );
  }

  if (notification.type === 'mention') {
    return (
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <div>
          <Typography fontSize="sm">
            <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
              @{notification.username}
            </Typography>{' '}
            mentioned you in a post
          </Typography>
          <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd hh:mm A')}</Typography>
        </div>
        <Sheet
          sx={{
            border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
            borderRadius: 'var(--joy-radius-md)',
            boxShadow: 'var(--joy-shadow-sm)',
            p: 1,
          }}
        >
          <Typography fontSize="sm">{notification.preview}</Typography>
        </Sheet>
      </Stack>
    );
  }

  if (notification.type === 'project_invite') {
    return (
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <div>
          <Typography fontSize="sm">
            <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
              @{notification.username}
            </Typography>{' '}
            invited you to{' '}
            <Typography fontWeight="lg" sx={{ cursor: 'pointer' }}>
              {notification.project}
            </Typography>{' '}
            project
          </Typography>
          <Typography level="body-xs">{dayjs(notification.createdAt).format('dddd hh:mm A')}</Typography>
        </div>
        <Stack direction="row" spacing={1}>
          <Button color="neutral" size="sm" variant="outlined">
            Decline
          </Button>
          <Button size="sm">Accept</Button>
        </Stack>
      </Stack>
    );
  }

  return <Box sx={{ flexGrow: 1 }} />;
}
