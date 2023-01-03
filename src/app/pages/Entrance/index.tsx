import { Box } from '@mantine/core'
import AppFooter from 'app/components/Footer/Footer'
import AppNavigator from 'app/components/HeaderApp'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function EntryPage() {
  return (
    <div>
      <AppNavigator />
      <Box sx={{ minHeight: `calc(100vh - 60px - 62px)` }}>
        <Outlet />
      </Box>
      <AppFooter />
    </div>
  )
}
