import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { RootState } from '@redux/store'
import TitleList from 'app/components/TitleList'

import { Title, Text } from '@mantine/core'
import { RequestParams } from 'common/type'
import { withTranslation } from 'react-i18next'
import { fetchAsyncFAQ } from '../slices'

function FAQ({ t }) {
  const { FAQList } = useAppSelector((state: RootState) => state.support)

  const dispatch = useAppDispatch()

  const searchHandler = (params: RequestParams) => {
    dispatch(fetchAsyncFAQ(params))
  }

  return (
    <div>
      <div className="py-10">
        <Title order={2}>{t('app.support.FAQ')}</Title>
        <Text size="lg">{t('app.support.FAQsubtitle')}</Text>
      </div>

      <TitleList listData={FAQList} handleSearch={searchHandler} />
    </div>
  )
}

export default withTranslation()(FAQ)
