/* eslint-disable react/no-array-index-key */
import { Button, Group } from '@mantine/core'
import { withTranslation } from 'react-i18next'

import { Outlet, useNavigate } from 'react-router-dom'
import { FAQ, NOTICE } from 'common'
import PageContainer from 'app/components/PageContainer/PageContainer'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import { fetchAsyncSupportDocs } from './slices'

export function Support() {
  const navigate = useNavigate()
  const { supportDocList } = useAppSelector((state: RootState) => state.support)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAsyncSupportDocs())
  }, [dispatch])

  return (
    <PageContainer>
      <Group>
        <Button onClick={() => navigate(FAQ)}>FAQ</Button>
        <Button onClick={() => navigate(NOTICE)}>Notice</Button>
        {supportDocList?.data?.map((item, index) => (
          // eslint-disable-next-line no-underscore-dangle
          <Button key={index} onClick={() => navigate(item._id)}>
            {item?.tabName}
          </Button>
        ))}
      </Group>

      <Outlet />
    </PageContainer>
  )
}

export default withTranslation()(Support)
