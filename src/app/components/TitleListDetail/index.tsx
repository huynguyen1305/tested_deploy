/* eslint-disable react/no-danger */
import { Button, Table, Text } from '@mantine/core'
import { useAppSelector } from '@redux/hooks'
import { RootState } from '@redux/store'
import { FAQ, NOTICE } from 'common'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Spinner from '../LoadingSpinner/Spinner'

function TitleListDetail({ data, type }) {
  const navigate = useNavigate()
  const { loading } = useAppSelector((state: RootState) => state.support)

  return !loading ? (
    data && (
      <Table
        horizontalSpacing="md"
        verticalSpacing="lg"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <tbody>
          <tr>
            <td style={{ width: '90%', borderTop: '1px solid #dee2e6' }}>
              <h2>{data?.data?.title}</h2>
            </td>
            <td style={{ width: '10%', borderTop: '1px solid #dee2e6' }}>
              <Text weight={500} align="end">
                {dayjs(data?.data?.updatedAt).format('YYYY.MM.DD')}
              </Text>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <td>
              <div dangerouslySetInnerHTML={{ __html: data?.data?.content }} />
            </td>
          </tr>
          <tr>
            <td className="text-center">
              <Button
                onClick={() => navigate(type === 'faq' ? FAQ : NOTICE)}
                radius="xl"
              >
                List view
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  ) : (
    <Spinner />
  )
}

export default TitleListDetail
