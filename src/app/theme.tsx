/* eslint-disable no-undef */
import React, { ReactNode, useEffect } from 'react'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'

export default function AppThemeProvider({
  children
}: {
  children: ReactNode
}) {
  // toggle mantine theme
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')

    setColorScheme(nextScheme)
  }

  // toggle tailwind theme
  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else document.documentElement.classList.remove('dark')
  }, [colorScheme])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        inherit
        theme={{
          fontFamily: 'Roboto,sans-serif',
          headings: { fontFamily: 'Roboto,sans-serif' },
          fontFamilyMonospace: 'Roboto,sans-serif',
          colorScheme,
          defaultRadius: 'lg',
          components: {
            AppShell: {
              styles: theme => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0]
                }
              })
            }
          }
        }}
      >
        <NotificationsProvider position="top-right">
          {children}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
