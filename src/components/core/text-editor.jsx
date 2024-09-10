'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorProvider } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { TextEditorToolbar } from './text-editor-toolbar';

/**
 * A thin wrapper around tiptap.
 *
 * How to get the updated content:
 * ```ts
 * <TextEditor
 *   onUpdate={({ editor }) => {
 *     console.log(editor.getHTML());
 *   }}
 * />
 * ```
 */
export function TextEditor({ children, content, hideToolbar, placeholder, ...props }) {
  const extensions = React.useMemo(() => {
    const base = [StarterKit.configure({})];

    if (placeholder) {
      base.push(
        Placeholder.configure({
          emptyEditorClass: 'is-editor-empty',
          placeholder,
        })
      );
    }

    return base;
  }, [placeholder]);

  return (
    <Box
      sx={{
        border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
        borderRadius: 'var(--joy-radius-sm)',
        boxShadow: 'var(--joy-shadow-xs)',
        '& > *:nth-child(2)': {
          '& > .tiptap': {
            color: 'text.primary',
            p: '8px',
            overflow: 'auto',
            flexGrow: 1,
            height: '300px',
            minHeight: '250px',
            '&:focus-visible': {
              outline: 'none',
            },
            '& p.is-editor-empty:first-child::before': {
              color: 'var(--joy-palette-text-tertiary)',
              content: 'attr(data-placeholder)',
              float: 'left',
              height: 0,
              pointerEvents: 'none',
            },
            '& pre': {
              bgcolor: 'var(--joy-palette-background-level1)',
              borderRadius: 'var(--joy-radius-md)',
              p: '8px',
            },
          },
        },
      }}
    >
      <EditorProvider
        content={content}
        extensions={extensions}
        slotBefore={hideToolbar ? <div /> : <TextEditorToolbar />}
        {...props}
      >
        {children}
      </EditorProvider>
    </Box>
  );
}
