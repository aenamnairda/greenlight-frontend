'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { useCurrentEditor } from '@tiptap/react';

export function TextEditorToolbar() {
  const { editor } = useCurrentEditor();

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid var(--joy-palette-divider)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        p: '8px',
        '& > button.isActive': {
          bgcolor: 'var(--joy-palette-primary-solidBg)',
          color: 'var(--joy-palette-primary-solidColor)',
        },
      }}
    >
      <Select
        disabled={!editor}
        onChange={(_, value) => {
          if (!value) {
            return;
          }

          if (value === 'p') {
            editor?.chain().focus().setParagraph().run();
            return;
          }

          if (value.startsWith('h')) {
            const level = parseInt(value.replace('h', ''));

            if (!isNaN(level) && level >= 1 && level <= 6) {
              editor?.chain().focus().toggleHeading({ level }).run();
            }
          }
        }}
        value={editor ? getFontValue(editor) : ''}
      >
        <Option value="p">Paragrah</Option>
        <Option value="h1">Heading 1</Option>
        <Option value="h2">Heading 2</Option>
        <Option value="h3">Heading 3</Option>
        <Option value="h4">Heading 4</Option>
        <Option value="h5">Heading 5</Option>
        <Option value="h6">Heading 6</Option>
      </Select>
      <IconButton
        className={editor?.isActive('bold') ? 'isActive' : ''}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        onClick={() => {
          editor?.chain().focus().toggleBold().run();
        }}
        size="sm"
      >
        <svg fill="none" height="12" viewBox="0 0 10 12" width="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.40625 11.625H0.625V0.375H5.9375C6.56385 0.375037 7.1771 0.554345 7.70482 0.891741C8.23253 1.22914 8.65264 1.71052 8.91554 2.27903C9.17843 2.84754 9.27312 3.47942 9.18841 4.10001C9.1037 4.72061 8.84314 5.30399 8.4375 5.78125C8.96733 6.20497 9.35279 6.78251 9.54082 7.43435C9.72886 8.0862 9.71022 8.7803 9.48748 9.42112C9.26474 10.0619 8.84884 10.6179 8.29704 11.0126C7.74524 11.4073 7.08466 11.6213 6.40625 11.625ZM2.5 9.75H6.39375C6.57842 9.75 6.76128 9.71363 6.9319 9.64296C7.10251 9.57229 7.25754 9.4687 7.38812 9.33812C7.5187 9.20754 7.62228 9.05251 7.69296 8.8819C7.76363 8.71128 7.8 8.52842 7.8 8.34375C7.8 8.15908 7.76363 7.97622 7.69296 7.8056C7.62228 7.63499 7.5187 7.47996 7.38812 7.34938C7.25754 7.2188 7.10251 7.11521 6.9319 7.04454C6.76128 6.97387 6.57842 6.9375 6.39375 6.9375H2.5V9.75ZM2.5 5.0625H5.9375C6.12217 5.0625 6.30503 5.02613 6.47565 4.95546C6.64626 4.88478 6.80129 4.7812 6.93187 4.65062C7.06245 4.52004 7.16604 4.36501 7.23671 4.1944C7.30738 4.02378 7.34375 3.84092 7.34375 3.65625C7.34375 3.47158 7.30738 3.28872 7.23671 3.1181C7.16604 2.94749 7.06245 2.79246 6.93187 2.66188C6.80129 2.5313 6.64626 2.42772 6.47565 2.35704C6.30503 2.28637 6.12217 2.25 5.9375 2.25H2.5V5.0625Z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
      <IconButton
        className={editor?.isActive('italic') ? 'isActive' : ''}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        onClick={() => {
          editor?.chain().focus().toggleItalic().run();
        }}
        size="sm"
      >
        <svg fill="none" height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.625 1.625V0.375H3.5V1.625H6.7125L3.98125 10.375H0.375V11.625H8.5V10.375H5.2875L8.01875 1.625H11.625Z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
      <IconButton
        className={editor?.isActive('strike') ? 'isActive' : ''}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        onClick={() => {
          editor?.chain().focus().toggleStrike().run();
        }}
        size="sm"
      >
        <svg fill="none" height="14" viewBox="0 0 16 14" width="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5 6.37489H9.2225C8.94498 6.30027 8.66619 6.23047 8.38625 6.16552C6.63125 5.75052 5.63875 5.44677 5.63875 4.02614C5.6245 3.7809 5.66081 3.53535 5.74542 3.30473C5.83004 3.07411 5.96115 2.86335 6.13062 2.68552C6.6615 2.24896 7.32644 2.0084 8.01375 2.00427C9.7825 1.96052 10.5981 2.56052 11.265 3.47302L12.2744 2.73552C11.8019 2.05699 11.1578 1.51605 10.4078 1.16796C9.65779 0.819872 8.82884 0.677113 8.00563 0.754268C6.99439 0.760724 6.01887 1.12898 5.25563 1.79239C4.96634 2.08583 4.74024 2.43541 4.59125 2.81959C4.44227 3.20377 4.37356 3.61439 4.38937 4.02614C4.36197 4.4767 4.4466 4.92702 4.63572 5.33688C4.82483 5.74674 5.11254 6.10337 5.47312 6.37489H0.5V7.62489H9.0325C10.2619 7.98114 10.9969 8.44489 11.0156 9.72364C11.0359 9.9968 10.9985 10.2712 10.9056 10.5289C10.8128 10.7866 10.6667 11.0218 10.4769 11.2193C9.81551 11.7406 8.99384 12.0165 8.15188 11.9999C7.52345 11.9817 6.90738 11.8208 6.35029 11.5294C5.7932 11.2381 5.30966 10.8238 4.93625 10.318L3.97812 11.1205C4.46358 11.7675 5.08994 12.2954 5.80972 12.6643C6.52951 13.0333 7.32384 13.2335 8.1325 13.2499H8.195C9.34924 13.2632 10.4695 12.8595 11.35 12.113C11.6625 11.7979 11.9054 11.4208 12.0632 11.006C12.2209 10.5913 12.2898 10.148 12.2656 9.70489C12.289 8.94692 12.0332 8.20676 11.5469 7.62489H15.5V6.37489Z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
      <IconButton
        className={editor?.isActive('codeBlock') ? 'isActive' : ''}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        onClick={() => {
          editor?.chain().focus().toggleCodeBlock().run();
        }}
        size="sm"
      >
        <svg fill="none" height="10" viewBox="0 0 20 10" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.375 5L15 9.375L14.1187 8.49375L17.6063 5L14.1187 1.50625L15 0.625L19.375 5ZM0.625 5L5 0.625L5.88125 1.50625L2.39375 5L5.88125 8.49375L5 9.375L0.625 5Z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
    </Box>
  );
}

function getFontValue(editor) {
  return editor.isActive('paragraph')
    ? 'p'
    : editor.isActive('heading', { level: 1 })
      ? 'h1'
      : editor.isActive('heading', { level: 2 })
        ? 'h2'
        : editor.isActive('heading', { level: 3 })
          ? 'h3'
          : editor.isActive('heading', { level: 4 })
            ? 'h4'
            : editor.isActive('heading', { level: 5 })
              ? 'h5'
              : editor.isActive('heading', { level: 6 })
                ? 'h6'
                : 'p';
}
