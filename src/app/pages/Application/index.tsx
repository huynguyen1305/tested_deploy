// import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React from 'react'
import { Title } from '@mantine/core'
import { withTranslation } from 'react-i18next'
import PageContainer from 'app/components/PageContainer/PageContainer'
import ApplicationList from './ApplicationList/ApplicationList'

export function Application() {
  return (
    <PageContainer>
      <Title order={2}>Apps</Title>
      <ApplicationList />
    </PageContainer>
  )
}

export default withTranslation()(Application)
