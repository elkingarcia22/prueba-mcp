import type { Preview } from '@storybook/nextjs-vite';
import '../src/styles/tokens.css';
import { ThemeProvider } from '../src/components/ThemeProvider';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      autodocs: 'tag',
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => React.createElement(ThemeProvider, {}, React.createElement(Story)),
  ],
};

export default preview;