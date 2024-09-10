'use client';

import * as React from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { toast } from 'sonner';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { logger } from '@/lib/default-logger';
import { getInitials } from '@/lib/get-initials';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';

const Popup = styled(Popper)({
  maxWidth: '340px',
  width: '100%',
  zIndex: 'var(--joy-zIndex-popup)',
});

export function UserPopover({ anchorEl, onClose, open }) {
  const { user } = useUser();
  const userInfo = user.user;

  const handleSignOut = React.useCallback(async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        logger.error('Sign out error', error);
        toast.error('Something went wrong, unable to sign out');
      }
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }

    const redirectTo = paths['auth.custom.sign-in'];

    window.location.href = redirectTo;
  }, []);

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
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Avatar>{getInitials(`${userInfo.name}`)}</Avatar>
              <div>
                <Typography fontWeight="lg" textColor="inherit">
                  {userInfo.name}
                </Typography>
                <Typography level="body-sm" textColor="neutral.500">
                  {userInfo.email}
                </Typography>
              </div>
            </Stack>
            <List
              sx={{
                bgcolor: 'var(--joy-palette-background-level1)',
                borderRadius: 'var(--joy-radius-sm)',
                overflow: 'hidden',
                '& .MuiListItemButton-root:hover': {
                  bgcolor: 'transparent',
                  color: 'var(--joy-palette-primary-plainColor)',
                  '& .MuiListItemDecorator-root': {
                    color: 'var(--joy-palette-primary-plainColor)',
                  },
                },
                '& .MuiListItemContent-root': {
                  fontSize: 'var(--joy-fontSize-md)',
                  fontWeight: 'var(--joy-fontWeight-md)',
                },
              }}
            >
              <ListItemButton component={RouterLink} href={paths['dashboard']} onClick={onClose}>
                <ListItemDecorator>
                  <HouseIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                </ListItemDecorator>
                <ListItemContent>Home</ListItemContent>
              </ListItemButton>
              <ListItemButton component={RouterLink} href={paths['dashboard.account']} onClick={onClose}>
                <ListItemDecorator>
                  <UserIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                </ListItemDecorator>
                <ListItemContent>Profile</ListItemContent>
              </ListItemButton>
              <ListItemButton component={RouterLink} href={paths['dashboard.account.security']} onClick={onClose}>
                <ListItemDecorator>
                  <GearSixIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                </ListItemDecorator>
                <ListItemContent>Settings</ListItemContent>
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  onClose?.();
                  handleSignOut().catch(() => {
                    // noop
                  });
                }}
              >
                <ListItemDecorator>
                  <SignOutIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                </ListItemDecorator>
                <ListItemContent>Logout</ListItemContent>
              </ListItemButton>
            </List>
          </Stack>
        </Sheet>
      </ClickAwayListener>
    </Popup>
  );
}
