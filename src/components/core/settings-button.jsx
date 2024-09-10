'use client';

import * as React from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import { setSettings as setPersistedSettings } from '@/lib/settings/set-settings';
import { usePopover } from '@/hooks/use-popover';
import { useSettings } from '@/hooks/use-settings';

const colors = [
  { id: 'purple', value: '#3d37dd' },
  { id: 'green', value: '#18834c' },
  { id: 'blue', value: '#1b49f5' },
];

export function SettingsButton() {
  const { settings, setSettings } = useSettings();
  const popover = usePopover();

  const handleUpdate = (values) => {
    popover.handleClose();

    const updatedSettings = {
      ...settings,
      ...values,
    };

    setSettings(updatedSettings);
    setPersistedSettings(updatedSettings);

    toast.success('Settings updated');
  };

  return (
    <Box
      sx={{
        bottom: 0,
        m: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'fixed',
        right: 0,
        gap: 2,
        zIndex: 'var(--joy-zIndex-popup)',
      }}
    >
      {popover.open ? (
        <SettingsPopover onClose={popover.handleClose} onUpdate={handleUpdate} settings={settings} />
      ) : null}
      <div>
        <IconButton
          color="neutral"
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
          sx={{
            alignItems: 'stretch',
            boxShadow: 'var(--joy-shadow-lg)',
            flexDirection: 'column',
            overflow: 'hidden',
            p: 0,
          }}
          variant="solid"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              transition: {
                ease: 'linear',
                duration: 4,
                repeat: Infinity,
              },
            }}
            style={{ alignItems: 'center', display: 'flex', flexGrow: 1, justifyContent: 'center' }}
          >
            <GearSixIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
          </motion.div>
        </IconButton>
      </div>
    </Box>
  );
}

function SettingsPopover({ onClose, onUpdate, settings }) {
  const [primaryColor, setPrimaryColor] = React.useState(settings.primaryColor);

  React.useEffect(() => {
    setPrimaryColor(settings.primaryColor);
  }, [settings]);

  return (
    <ClickAwayListener onClickAway={() => onClose?.()}>
      <Sheet
        sx={{
          borderRadius: 'var(--joy-radius-sm)',
          boxShadow: 'var(--joy-shadow-lg)',
          p: 2,
          width: '320px',
          maxWidth: '100%',
        }}
      >
        <Stack spacing={2}>
          <Typography level="title-md">Primary Color</Typography>
          <Stack direction="row" spacing={2}>
            {colors.map((color) => (
              <Box
                key={color.id}
                onClick={() => {
                  setPrimaryColor(color.id);
                }}
                sx={{
                  bgcolor: color.value,
                  border: '1px solid var(--joy-palette-background-surface)',
                  borderRadius: 'var(--joy-radius-sm)',
                  flex: '0 0 auto',
                  height: '32px',
                  width: '32px',
                  ...(primaryColor === color.id && {
                    outline: `2px solid ${color.value}`,
                  }),
                }}
              />
            ))}
          </Stack>
          <Button color="neutral" onClick={() => onUpdate?.({ primaryColor })} size="sm" variant="outlined">
            Apply
          </Button>
        </Stack>
      </Sheet>
    </ClickAwayListener>
  );
}
