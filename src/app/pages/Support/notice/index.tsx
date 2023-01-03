import { Title, Text } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { RootState } from '@redux/store'
import TitleList from 'app/components/TitleList'
import { RequestParams } from 'common/type'
import { withTranslation } from 'react-i18next'
import { fetchAsyncNotices } from '../slices'

function Notice({ t }) {
  const { noticeList } = useAppSelector((state: RootState) => state.support)

  const dispatch = useAppDispatch()

  const searchHandler = (params: RequestParams) => {
    dispatch(fetchAsyncNotices(params))
  }

  return (
    <div>
      <div className="py-10">
        <Title order={2}>{t('app.support.notice')}</Title>
        <Text size="lg">{t('app.support.noticeSubtitle')}</Text>
      </div>

      <TitleList listData={noticeList} handleSearch={searchHandler} />
    </div>
  )
}

export default withTranslation()(Notice)
