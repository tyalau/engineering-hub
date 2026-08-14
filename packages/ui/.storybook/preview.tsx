import { withThemeByClassName } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'
import { Toaster } from '../src/components/Toast/Toast'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    a11y: {
      // non-blocking in CI
      test: 'todo',
      context: {
        exclude: ['.font-mono'],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    // Mount a single Toaster for the whole preview so toast stories don't each render
    // their own (which would duplicate toasts on the combined autodocs page).
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
}

export default preview
