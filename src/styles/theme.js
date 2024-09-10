import { extendTheme } from '@mui/joy/styles';

import { spacingToGap } from './utils';

const primaryBlue = {
  50: '#eef4ff',
  100: '#d9e6ff',
  200: '#bcd4ff',
  300: '#8ebaff',
  400: '#5994ff',
  500: '#2d68ff',
  600: '#1b49f5',
  700: '#1436e1',
  800: '#172cb6',
  900: '#192b8f',
};

const primaryGreen = {
  50: '#eefbf2',
  100: '#d6f5df',
  200: '#b1e9c4',
  300: '#7ed7a2',
  400: '#48bf7b',
  500: '#26a360',
  600: '#18834c',
  700: '#157546',
  800: '#115433',
  900: '#0f452c',
};

const primaryPurple = {
  50: '#ececfe',
  100: '#dad8fd',
  200: '#c7c5fc',
  300: '#8f8bfa',
  400: '#6964f8',
  500: '#443df6',
  600: '#3d37dd',
  700: '#292594',
  800: '#221f7b',
  900: '#14124a',
};

const green = {
  50: '#f0fdf2',
  100: '#dcfce3',
  200: '#bbf7c9',
  300: '#87eea0',
  400: '#4bdd6f',
  500: '#25d050',
  600: '#17a23a',
  700: '#167f31',
  800: '#16652b',
  900: '#145326',
};

const orange = {
  50: '#fffaeb',
  100: '#fff2c6',
  200: '#ffe288',
  300: '#ffce4a',
  400: '#ffbb29',
  500: '#f99607',
  600: '#dd6f02',
  700: '#b74c06',
  800: '#943a0c',
  900: '#7a300d',
};

const red = {
  50: '#fef2f2',
  100: '#ffe1e1',
  200: '#ffc9c9',
  300: '#fea3a3',
  400: '#fb6e6e',
  500: '#f23a3a',
  600: '#e02222',
  700: '#bc1919',
  800: '#9c1818',
  900: '#811b1b',
};

const gradient = {
  1: 'linear-gradient(120deg, #eefadc 0%, #fce5f3 100%)',
  2: 'linear-gradient(120deg, #cee7fe 0%, #eefadc 100%)',
  3: 'linear-gradient(120deg, #f9d8e7 0%, #cee7fe 100%)',
  4: 'linear-gradient(120deg, #c6d4f9 0%, #f9d8e7 100%)',
};

export function createTheme(primaryColor) {
  const primary =
    {
      blue: primaryBlue,
      green: primaryGreen,
      purple: primaryPurple,
    }[primaryColor] ?? primaryPurple;

  return extendTheme({
    colorSchemes: {
      light: {
        palette: {
          common: {
            black: '#000000',
            white: '#ffffff',
          },
          danger: {
            ...red,
          },
          gradient,
          neutral: {
            900: '#1a1a20',
            950: '#0e0f11',
          },
          primary: {
            ...primary,
          },
          warning: {
            ...orange,
          },
        },
        shadowOpacity: '0.04',
      },
      dark: {
        palette: {
          common: {
            black: '#000000',
            white: '#ffffff',
          },
          danger: {
            ...red,
          },
          gradient,
          neutral: {
            900: '#1a1d20',
            950: '#0e0f11',
          },
          primary: {
            ...primary,
          },
          success: {
            ...green,
          },
          warning: {
            ...orange,
          },
        },
        shadowOpacity: '0.3',
      },
    },
    components: {
      JoyBreadcrumbs: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      JoyButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            borderRadius: 'var(--joy-radius-md)',
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'var(--joy-shadow-xs)',
            }),
            ...(ownerState.variant === 'solid' &&
              ownerState.color === 'neutral' && {
                backgroundColor: 'var(--joy-palette-neutral-900)',
              }),
          }),
        },
      },
      JoyCard: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--joy-radius-lg)',
            boxShadow: 'var(--joy-shadow-xs)',
          },
        },
      },
      JoyInput: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'var(--joy-shadow-xs)',
            }),
          }),
        },
      },
      JoyIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'var(--joy-shadow-sm)',
            }),
            ...(ownerState.variant === 'solid' &&
              ownerState.color === 'neutral' && {
                backgroundColor: 'var(--joy-palette-neutral-900)',
              }),
          }),
        },
      },
      JoyLink: {
        styleOverrides: {
          root: {
            textDecorationColor: 'var(--joy-palette-text-primary)',
            '&:hover': {
              color: 'var(--joy-palette-text-primary)',
            },
          },
        },
      },
      JoyModal: {
        styleOverrides: {
          backdrop: {
            backdropFilter: 'none',
          },
        },
      },
      JoySelect: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'var(--joy-shadow-xs)',
            }),
          }),
        },
      },
      JoyStack: {
        defaultProps: {
          useFlexGap: true,
        },
        styleOverrides: {
          // @ts-expect-error -- Types conflict
          root: ({ ownerState }) => {
            return {
              gap: spacingToGap(ownerState.spacing),
            };
          },
        },
      },
      JoyTabs: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'custom' && {
              backgroundColor: 'transparent',
              '& .MuiTabList-root': {
                backgroundColor: 'var(--joy-palette-background-level1)',
                borderRadius: 'var(--joy-radius-md)',
                boxShadow: 'none',
                gap: '4px',
                padding: '4px',
              },
              '& .MuiTab-root': {
                borderRadius: 'var(--joy-radius-md)',
                flexGrow: 1,
                '&:after': {
                  display: 'none',
                },
                '&.Mui-selected': {
                  backgroundColor: 'var(--joy-palette-background-surface)',
                  boxShadow: 'var(--joy-shadow-sm)',
                },
                '&:not(&.Mui-selected):hover': {
                  backgroundColor: 'var(--joy-palette-background-level2)',
                },
              },
            }),
          }),
        },
      },
      JoyTable: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-stripeBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-borderColor': 'var(--joy-palette-divider)',
            ...(ownerState.borderAxis === 'header' && {
              '& thead th:not([colspan])': {
                borderBottom: 'var(--Table-headerUnderlineThickness) solid var(--TableCell-borderColor)',
              },
            }),
          }),
        },
      },
      JoyTextarea: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'outlined' && {
              boxShadow: 'var(--joy-shadow-xs)',
            }),
          }),
        },
      },
    },
    fontFamily: {
      body: "'Be Vietnam Pro', var(--joy-fontFamily-fallback)",
      code: "'Roboto Mono', var(--joy-fontFamily-fallback)",
      display: "'Inter', var(--joy-fontFamily-fallback)",
    },
    typography: {
      h1: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-xl)',
      },
      h2: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-xl)',
      },
      h3: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      },
      h4: {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      },
      'title-lg': {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      },
      'title-md': {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      },
      'title-sm': {
        fontFamily: 'var(--joy-fontFamily-display)',
        fontWeight: 'var(--joy-fontWeight-lg)',
      },
    },
  });
}
